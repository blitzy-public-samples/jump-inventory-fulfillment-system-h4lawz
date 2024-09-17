from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OrderItem(BaseModel):
    product_id: int
    sku: str
    name: str
    quantity: int
    price: float

class Order(BaseModel):
    shopify_order_id: str
    status: str
    order_date: datetime
    items: List[OrderItem]
    tracking_number: Optional[str]
    fulfilled_at: Optional[datetime]

class OrderCreate(BaseModel):
    shopify_order_id: str
    items: List[OrderItem]
    order_date: datetime

class OrderUpdate(BaseModel):
    status: Optional[str]
    tracking_number: Optional[str]
    fulfilled_at: Optional[datetime]