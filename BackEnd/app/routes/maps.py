"""Google Maps Platform routes for geocoding, places search, and location enrichment."""
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from app.services.google_maps_service import get_maps_service

router = APIRouter()


class GeocodeRequest(BaseModel):
    address: str


class GeocodeBatchRequest(BaseModel):
    addresses: List[str]


class EnrichRequest(BaseModel):
    company_name: str
    city: str = ""


class NearbySearchRequest(BaseModel):
    location: str
    query: str
    radius: int = 50000
    keyword: str = ""


class PlacesAutocompleteRequest(BaseModel):
    query: str
    location: str = ""
    radius: int = 50000


class PlacesDetailRequest(BaseModel):
    place_id: str


@router.options("/maps/geocode")
@router.options("/maps/geocode/batch")
@router.options("/maps/places/autocomplete")
@router.options("/maps/places/detail")
@router.options("/maps/places/nearby")
@router.options("/maps/enrich")
async def maps_cors_preflight():
    return JSONResponse(status_code=204, content={})


def _safe_call(func, *args, **kwargs):
    try:
        return func(*args, **kwargs)
    except Exception as e:
        return {"error": str(e)}


@router.post("/maps/geocode")
async def maps_geocode(req: GeocodeRequest):
    """Geocode a single address to lat/lng."""
    svc = get_maps_service()
    result = _safe_call(svc.geocode_address, req.address)
    return {"success": "error" not in result, "data": result}


@router.post("/maps/geocode/batch")
async def maps_geocode_batch(req: GeocodeBatchRequest):
    """Geocode multiple addresses in sequence."""
    svc = get_maps_service()
    results = []
    for addr in req.addresses:
        res = _safe_call(svc.geocode_address, addr)
        res["input"] = addr
        results.append(res)
    return {"success": True, "data": results, "total": len(results)}


@router.post("/maps/enrich")
async def maps_enrich(req: EnrichRequest):
    """Enrich a company with Google Maps location data."""
    svc = get_maps_service()
    result = _safe_call(svc.enrich_company_location, req.company_name, req.city)
    return {"success": True, "data": result}


@router.post("/maps/places/autocomplete")
async def maps_autocomplete(req: PlacesAutocompleteRequest):
    """Get place autocomplete predictions."""
    svc = get_maps_service()
    results = _safe_call(svc.places_autocomplete, req.query, req.location, req.radius)
    return {"success": True, "data": results}


@router.post("/maps/places/detail")
async def maps_places_detail(req: PlacesDetailRequest):
    """Get detailed place information by place_id."""
    svc = get_maps_service()
    result = _safe_call(svc.places_detail, req.place_id)
    return {"success": "error" not in result, "data": result}


@router.post("/maps/places/nearby")
async def maps_nearby(req: NearbySearchRequest):
    """Search for nearby places."""
    svc = get_maps_service()
    results = _safe_call(svc.nearby_search, req.location, req.query, req.radius, req.keyword)
    return {"success": True, "data": results}


@router.post("/maps/reverse-geocode")
async def maps_reverse_geocode(lat: float = Query(...), lng: float = Query(...)):
    """Reverse geocode coordinates to an address."""
    svc = get_maps_service()
    result = _safe_call(svc.geocode_coordinates, lat, lng)
    return {"success": "error" not in result, "data": result}