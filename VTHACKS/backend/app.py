import requests
import os
import json
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
API_KEY = os.environ.get("RENTCAST_API_KEY")
if not API_KEY:
    raise ValueError("Please set the RENTCAST_API_KEY environment variable.")

# Base property address (VT campus)
VT_ADDRESS = "800 Drillfield Dr, Blacksburg, VA 24061"

# Common headers
headers = {
    "accept": "application/json",
    "X-Api-Key": API_KEY
}

# Rental Listings Endpoint (off-campus rentals)
listings_url = "https://api.rentcast.io/v1/listings/rental/long-term"
listings_params = {
    "address": VT_ADDRESS,
    "radius": 5,  # miles around VT campus
    "limit": 20,
    "propertyType": "Apartment,Townhouse",  # filter by type
    "bedrooms": "1,2,3",
    "bathrooms": "1,2"
}

response = requests.get(listings_url, headers=headers, params=listings_params)
if response.status_code == 200:
    data = response.json()

    # Extract relevant fields for each listing
    listings = []
    for listing in data:
        listings.append({
            "id": listing.get("id"),
            "address": listing.get("formattedAddress"),
            "price": listing.get("price"),
            "bedrooms": listing.get("bedrooms"),
            "bathrooms": listing.get("bathrooms"),
            "squareFootage": listing.get("squareFootage"),
            "propertyType": listing.get("propertyType"),
            "status": listing.get("status"),
            "latitude": listing.get("latitude"),
            "longitude": listing.get("longitude"),
            "listedDate": listing.get("listedDate"),
            "images": [img.get("url") for img in listing.get("media", []) if img.get("type") == "photo"]
        })

    # Save all listings to a single JSON file
    with open("vt_listings.json", "w", encoding="utf-8") as f:
        json.dump(listings, f, indent=4)

    print("Saved VT rental listings to vt_listings.json")
else:
    print(f"Error {response.status_code}: {response.text}")
