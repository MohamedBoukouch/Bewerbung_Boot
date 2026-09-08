"""Google Maps Platform service for geocoding, places search, and location enrichment."""

import os
import requests
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

GMAPS_API_KEY = os.environ.get("GMAPS_API_KEY", "")
GMAPS_BASE_URL = "https://maps.googleapis.com/maps/api"


class GoogleMapsService:
    """Wrapper around Google Maps Platform REST APIs."""

    def __init__(self, api_key: str = None):
        self.api_key = api_key or GMAPS_API_KEY

    def _get(self, endpoint: str, params: dict) -> dict:
        url = f"{GMAPS_BASE_URL}/{endpoint}"
        params["key"] = self.api_key
        try:
            resp = requests.get(url, params=params, timeout=15)
            resp.raise_for_status()
            return resp.json()
        except requests.RequestException as e:
            return {"error": str(e)}

    def geocode_address(self, address: str) -> Optional[dict]:
        """Geocode a free-form address into lat/lng and formatted address."""
        if not self.api_key:
            return {"error": "GMAPS_API_KEY not configured"}

        result = self._get("geocode/json", {"address": address, "language": "en"})
        if result.get("status") == "OK" and result.get("results"):
            top = result["results"][0]
            return {
                "formatted_address": top.get("formatted_address", ""),
                "latitude": top["geometry"]["location"].get("lat"),
                "longitude": top["geometry"]["location"].get("lng"),
                "place_id": top.get("place_id", ""),
                "types": top.get("types", []),
            }
        return {"status": result.get("status", "UNKNOWN"), "results": []}

    def geocode_coordinates(self, lat: float, lng: float) -> Optional[dict]:
        """Reverse geocode lat/lng into a human-readable address."""
        if not self.api_key:
            return {"error": "GMAPS_API_KEY not configured"}

        result = self._get(
            "geocode/json",
            {"latlng": f"{lat},{lng}", "language": "en"},
        )
        if result.get("status") == "OK" and result.get("results"):
            top = result["results"][0]
            return {
                "formatted_address": top.get("formatted_address", ""),
                "latitude": lat,
                "longitude": lng,
                "place_id": top.get("place_id", ""),
                "types": top.get("types", []),
            }
        return {"status": result.get("status", "UNKNOWN"), "results": []}

    def places_autocomplete(self, query: str, location: str = "", radius: int = 50000) -> List[dict]:
        """Autocomplete place names for a search query."""
        if not self.api_key:
            return []

        params = {"input": query, "language": "en", "types": "geocode"}
        if location and radius:
            parts = self._parse_location(location)
            if parts:
                params["location"] = f"{parts[0]},{parts[1]}"
                params["radius"] = radius

        result = self._get("place/autocomplete/json", params)
        if result.get("status") == "OK":
            return [
                {
                    "description": r.get("description", ""),
                    "place_id": r.get("place_id", ""),
                    "structured_formatting": r.get("structured_formatting", {}),
                }
                for r in result.get("predictions", [])
            ]
        return []

    def places_detail(self, place_id: str) -> Optional[dict]:
        """Get detailed information for a place by place_id."""
        if not self.api_key:
            return {"error": "GMAPS_API_KEY not configured"}

        result = self._get(
            "place/details/json",
            {
                "place_id": place_id,
                "language": "en",
                "fields": "formatted_address,geometry, name,rating,opening_hours,website,formatted_phone_number,address_components",
            },
        )
        if result.get("status") == "OK" and result.get("result"):
            r = result["result"]
            geo = r.get("geometry", {}).get("location", {})
            return {
                "name": r.get("name", ""),
                "formatted_address": r.get("formatted_address", ""),
                "latitude": geo.get("lat"),
                "longitude": geo.get("lng"),
                "place_id": r.get("place_id", ""),
                "rating": r.get("rating"),
                "website": r.get("website", ""),
                "phone": r.get("formatted_phone_number", ""),
                "types": r.get("types", []),
                "address_components": r.get("address_components", []),
            }
        return {"status": result.get("status", "UNKNOWN"), "result": None}

    def nearby_search(self, location: str, query: str, radius: int = 50000, keyword: str = "") -> List[dict]:
        """Search for nearby places matching a query."""
        if not self.api_key:
            return []

        parts = self._parse_location(location)
        if not parts:
            return []

        params = {
            "location": f"{parts[0]},{parts[1]}",
            "radius": radius,
            "keyword": keyword or query,
            "language": "en",
        }

        result = self._get("place/nearbysearch/json", params)
        if result.get("status") == "OK":
            return [
                {
                    "name": r.get("name", ""),
                    "place_id": r.get("place_id", ""),
                    "latitude": r.get("geometry", {}).get("location", {}).get("lat"),
                    "longitude": r.get("geometry", {}).get("location", {}).get("lng"),
                    "vicinity": r.get("vicinity", ""),
                    "rating": r.get("rating"),
                    "types": r.get("types", []),
                }
                for r in result.get("results", [])
            ]
        return result.get("results", [])

    def enrich_company_location(self, company_name: str, city: str = "") -> dict:
        """Enrich a company record with Google Maps location data."""
        search_query = f"{company_name} {city}".strip()
        if not search_query:
            return {"found": False}

        # Try to find the company as a place
        autocomplete = self.places_autocomplete(search_query, radius=100000)
        for pred in autocomplete[:3]:
            detail = self.places_detail(pred["place_id"])
            if detail and detail.get("latitude") and detail.get("longitude"):
                detail["found"] = True
                detail["match_source"] = pred["description"]
                return detail

        # Fallback: geocode the search query
        geo = self.geocode_address(search_query)
        if geo.get("latitude"):
            geo["found"] = True
            return geo

        return {"found": False, "query": search_query}

    def _parse_location(self, location: str) -> Optional[tuple]:
        """Parse 'lat,lng' or try to geocode a location string."""
        if "," in location:
            parts = location.split(",")
            try:
                return (float(parts[0].strip()), float(parts[1].strip()))
            except (ValueError, IndexError):
                pass
        # Try to geocode the location string
        geo = self.geocode_address(location)
        if geo.get("latitude"):
            return (geo["latitude"], geo["longitude"])
        return None


def get_maps_service() -> GoogleMapsService:
    """Singleton accessor for the Google Maps service."""
    return GoogleMapsService()