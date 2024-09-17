import requests
from typing import List, Dict
from backend.app.core.config import settings
from backend.app.db.models import Order, Product

SHOPIFY_API_URL = f'https://{settings.SHOPIFY_API_KEY}:{settings.SHOPIFY_API_SECRET}@{settings.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-04'

# HUMAN ASSISTANCE NEEDED
# The following function has a confidence level below 0.8 and may need adjustments for production readiness
def sync_orders() -> List[Order]:
    # Fetch unfulfilled orders from Shopify API
    response = requests.get(f"{SHOPIFY_API_URL}/orders.json?status=unfulfilled")
    response.raise_for_status()
    shopify_orders = response.json()['orders']

    synchronized_orders = []
    for shopify_order in shopify_orders:
        # Process each order and create/update in local database
        order, created = Order.objects.update_or_create(
            shopify_id=shopify_order['id'],
            defaults={
                'order_number': shopify_order['order_number'],
                'email': shopify_order['email'],
                'total_price': shopify_order['total_price'],
                'status': shopify_order['financial_status'],
                # Add more fields as needed
            }
        )
        synchronized_orders.append(order)

    return synchronized_orders

# HUMAN ASSISTANCE NEEDED
# The following function has a confidence level below 0.8 and may need adjustments for production readiness
def sync_products() -> List[Product]:
    # Fetch products from Shopify API
    response = requests.get(f"{SHOPIFY_API_URL}/products.json")
    response.raise_for_status()
    shopify_products = response.json()['products']

    synchronized_products = []
    for shopify_product in shopify_products:
        # Process each product and create/update in local database
        product, created = Product.objects.update_or_create(
            shopify_id=shopify_product['id'],
            defaults={
                'title': shopify_product['title'],
                'description': shopify_product['body_html'],
                'price': shopify_product['variants'][0]['price'],
                'sku': shopify_product['variants'][0]['sku'],
                # Add more fields as needed
            }
        )
        synchronized_products.append(product)

    return synchronized_products

def update_order_status(shopify_order_id: str, new_status: str) -> bool:
    # Prepare update payload
    payload = {
        "order": {
            "id": shopify_order_id,
            "status": new_status
        }
    }

    # Send PUT request to Shopify API
    response = requests.put(f"{SHOPIFY_API_URL}/orders/{shopify_order_id}.json", json=payload)

    # Handle response and return result
    if response.status_code == 200:
        return True
    else:
        # Log error or handle it appropriately
        return False