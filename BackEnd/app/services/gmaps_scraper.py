"""Google Maps Places Scraper — finds businesses via Google Maps Places API
and extracts emails from their websites using the same async HTTPX flow
as the other scrapers (Arbeitsagentur, Azubiyo, etc.).
"""
import asyncio
from typing import List, Optional, Callable

import httpx
from bs4 import BeautifulSoup

from app.services.scraper_base import BaseScraper
from app.services.contact_finder import find_email_on_company_website

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
}


class GMapsScraper(BaseScraper):
    """Scraper that uses Google Maps Places API to find businesses and
    extract emails from their websites using async HTTPX (same flow as
    the other scrapers).
    """

    def __init__(
        self,
        profession: str,
        location: str = "",
        max_results: int = 50,
        field_tags: List[str] = None,
        log_callback: Optional[Callable] = None,
    ):
        super().__init__(profession, location, max_results, field_tags, log_callback)
        self.source_label = "gmaps"

    async def _fetch_website(self, client: httpx.AsyncClient, url: str) -> str:
        """Fetch a website and return its HTML content."""
        if not url.startswith("http"):
            url = "https://" + url
        try:
            resp = await client.get(url, headers=HEADERS, timeout=10.0, follow_redirects=True)
            resp.raise_for_status()
            return resp.text
        except Exception as e:
            self.log("info", f"Could not fetch website {url}: {str(e)[:120]}")
            return ""

    @staticmethod
    def _extract_emails_from_html(html: str) -> List[str]:
        """Extract emails from HTML (same logic as contact_finder)."""
        soup = BeautifulSoup(html, "html.parser")
        emails: List[str] = []
        seen = set()

        for a in soup.find_all("a", href=True):
            href = a["href"]
            if href.lower().startswith("mailto:"):
                addr = href.split(":", 1)[1].split("?")[0].strip()
                if "@" in addr and addr.lower() not in seen:
                    seen.add(addr.lower())
                    emails.append(addr)

        if emails:
            return emails

        text = soup.get_text(" ", strip=True)
        import re
        pattern = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
        for match in pattern.findall(text):
            if match.lower() not in seen:
                seen.add(match.lower())
                emails.append(match)

        return emails

    def _dedup_key(self, name: str, email: str) -> str:
        """Dedup by normalized company name only (not by city).
        Same company name = same business, regardless of city field."""
        return name.strip().lower()

    async def scrape(self) -> List[dict]:
        """Main scrape loop using Google Maps Places API + async website scraping."""
        self.log("info", "=== Google Maps Places Scraping Start ===")
        self.log("info", f"Profession: '{self.profession}'")
        self.log("info", f"Location: '{self.location or 'Germany-wide'}'")
        self.log("info", f"Target: {self.target_max} companies with email")
        self.log("info", "Email is REQUIRED. Offers without email are DISCARDED.")

        profession = self.profession.strip() if self.profession else self.profession
        location = self.location.strip() if self.location else ""

        # Build the search query combining profession and location
        search_terms = []
        if profession:
            search_terms.append(profession)
        if location:
            search_terms.append(location)
        search_terms.append("Deutschland")
        query = " ".join(search_terms)

        self.log("info", f"Search query: '{query}'")

        # Step 1: Use Places Autocomplete to find relevant businesses
        self.log("info", "Step 1: Searching Google Places for businesses...")

        from app.services.google_maps_service import GoogleMapsService
        gmaps = GoogleMapsService()

        autocomplete_results = gmaps.places_autocomplete(query, radius=100000)
        self.log("info", f"Found {len(autocomplete_results)} place predictions")

        if not autocomplete_results:
            # Try broader search with just profession
            broader_query = profession or "Ausbildung"
            if location:
                broader_query += f" {location}"
            self.log("info", f"Trying broader search: '{broader_query}'")
            autocomplete_results = gmaps.places_autocomplete(broader_query, radius=100000)
            self.log("info", f"Broader search found {len(autocomplete_results)} predictions")

        if not autocomplete_results:
            self.log("error", "No Google Places results found for this query.")
            return []

        # Step 2: Get details for top predictions
        self.log("info", "Step 2: Fetching place details and websites...")
        place_ids = [r["place_id"] for r in autocomplete_results[:100]]

        places = []
        for place_id in place_ids:
            try:
                detail = gmaps.places_detail(place_id)
                if detail and detail.get("name"):
                    places.append(detail)
            except Exception as e:
                self.log("error", f"Places detail error for {place_id}: {str(e)[:100]}")
            await asyncio.sleep(0.15)

        self.log("info", f"Got details for {len(places)} places")

        # Step 3: Search nearby for more results in the location area
        if location:
            self.log("info", f"Step 3: Searching for nearby businesses in '{location}'...")
            geo = gmaps.geocode_address(location)
            if geo and geo.get("latitude"):
                nearby = gmaps.nearby_search(
                    location=f"{geo['latitude']},{geo['longitude']}",
                    query=profession or "Ausbildung",
                    radius=50000,
                    keyword=profession or "training",
                )
                self.log("info", f"Nearby search found {len(nearby)} results")

                for place in nearby:
                    if len(places) >= 200:
                        break
                    places.append({
                        "name": place.get("name", ""),
                        "latitude": place.get("latitude"),
                        "longitude": place.get("longitude"),
                        "formatted_address": place.get("vicinity", ""),
                        "website": "",
                        "formatted_phone_number": "",
                        "types": place.get("types", []),
                        "is_nearby": True,
                    })

        # Step 4: For each place, try to scrape email from website
        async with httpx.AsyncClient(follow_redirects=True) as client:
            processed = 0
            for place in places:
                if self._should_stop():
                    self.log("info", f"Reached target limit ({self.target_max}). Stopping.")
                    break

                name = place.get("name", "")
                if not name:
                    continue

                self._set_current(name, place.get("website", ""))
                processed += 1

                website = place.get("website", "")
                if not website and place.get("website_uri"):
                    website = place.get("website_uri")

                email = ""
                if website:
                    if not website.startswith("http"):
                        website = "https://" + website
                    self.log("info", f"Scraping website for {name}: {website}")
                    email = await find_email_on_company_website(client, website, HEADERS, log=self.log)
                    if not email:
                        # Fallback: try direct HTML extraction from a fetched page
                        html = await self._fetch_website(client, website)
                        if html:
                            found = self._extract_emails_from_html(html)
                            if found:
                                email = found[0]

                # If still no email, try to find the website via nearby search
                if not email and place.get("is_nearby"):
                    self.log("info", f"Trying to find website for nearby: {name}")
                    enriched = gmaps.enrich_company_location(name, place.get("formatted_address", ""))
                    if enriched.get("found") and enriched.get("website"):
                        enriched_website = enriched["website"]
                        if not enriched_website.startswith("http"):
                            enriched_website = "https://" + enriched_website
                        email = await find_email_on_company_website(client, enriched_website, HEADERS, log=self.log)
                        if not email:
                            html = await self._fetch_website(client, enriched_website)
                            if html:
                                found = self._extract_emails_from_html(html)
                                if found:
                                    email = found[0]

                phone = place.get("formatted_phone_number", "")
                city = ""
                address = place.get("formatted_address", "")
                if address:
                    parts = address.split(",")
                    for part in parts:
                        part = part.strip()
                        if any(kw in part.lower() for kw in [
                            "berlin", "hamburg", "munich", "münchen", "frankfurt", "köln", "cologne",
                            "stuttgart", "düsseldorf", "dortmund", "essen", "leipzig", "dresden",
                            "hannover", "nürnberg", "nuremberg", "duisburg", "bochum", "wuppertal",
                            "bielefeld", "bonn", "münster", "karlsruhe", "mannheim", "augsburg",
                            "wiesbaden", "gelsenkirchen", "braunschweig", "chemnitz", "kiel",
                            "aachen", "magdeburg", "erfurt", "mainz", "kassel", "hildesheim",
                            "salzgitter", "coburg"
                        ]):
                            city = part.strip()
                            break
                    if not city and len(parts) > 1:
                        city = parts[-2].strip()

                if not city and place.get("geometry", {}).get("location"):
                    loc = place["geometry"]["location"]
                    city = f"({loc.get('lat', '')}, {loc.get('lng', '')})"

                job_title = place.get("types", [""])[0] if place.get("types") else self.profession

                if not email:
                    self.log("info", f"Skipping '{name}': no email found")
                    continue

                self._add_company(
                    name=name,
                    email=email,
                    city=city,
                    website=website or "",
                    phone=phone or "",
                    job_title=job_title or "",
                )

                await asyncio.sleep(0.3)

        self.log("info", "=== Google Maps Places Scraping Complete ===")
        self.log("info", f"Total companies with email: {len(self.companies)} (target was {self.target_max})")

        return self.get_results()