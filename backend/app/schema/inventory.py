from pydantic import BaseModel
from typing import Optional

class InventoryItem(BaseModel):
    product_id: int
    sku: str
    name: str
    quantity: int
    location: Optional[str] = None

class InventoryUpdate(BaseModel):
    product_id: int
    quantity_change: int
    reason: Optional[str] = None