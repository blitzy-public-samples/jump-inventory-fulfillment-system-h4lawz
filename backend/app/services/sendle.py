import requests
from typing import Dict
from backend.app.core.config import settings
from backend.app.db.models import Order

SENDLE_API_URL = f'https://api.sendle.com/api/v1'

# HUMAN ASSISTANCE NEEDED
# The following function needs review and potential modifications for production readiness
def generate_shipping_label(order: Order) -> Dict:
    # Prepare shipping details from order data
    shipping_details = {
        "pickup": {
            "address": order.sender_address,
            "suburb": order.sender_suburb,
            "postcode": order.sender_postcode,
            "state": order.sender_state,
            "country": order.sender_country
        },
        "delivery": {
            "address": order.recipient_address,
            "suburb": order.recipient_suburb,
            "postcode": order.recipient_postcode,
            "state": order.recipient_state,
            "country": order.recipient_country
        },
        "package": {
            "weight": order.package_weight,
            "description": order.package_description
        }
    }

    # Send POST request to Sendle API
    response = requests.post(
        f"{SENDLE_API_URL}/labels",
        json=shipping_details,
        headers={
            "Authorization": f"Bearer {settings.SENDLE_API_KEY}",
            "Content-Type": "application/json"
        }
    )

    # Process response and extract label information
    if response.status_code == 200:
        label_data = response.json()
        return {
            "tracking_number": label_data.get("tracking_number"),
            "label_url": label_data.get("label_url")
        }
    else:
        # Handle error cases
        raise Exception(f"Failed to generate shipping label: {response.text}")

def track_shipment(tracking_number: str) -> Dict:
    # Send GET request to Sendle API with tracking number
    response = requests.get(
        f"{SENDLE_API_URL}/tracking/{tracking_number}",
        headers={
            "Authorization": f"Bearer {settings.SENDLE_API_KEY}",
            "Content-Type": "application/json"
        }
    )

    # Process response and extract tracking information
    if response.status_code == 200:
        tracking_data = response.json()
        return {
            "status": tracking_data.get("status"),
            "estimated_delivery": tracking_data.get("estimated_delivery"),
            "current_location": tracking_data.get("current_location"),
            "tracking_events": tracking_data.get("tracking_events")
        }
    else:
        # Handle error cases
        raise Exception(f"Failed to retrieve tracking information: {response.text}")