from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: int
    shopify_product_id: str
    name: str
    sku: str
    barcode: Optional[str] = None
    price: Optional[float] = None

class ProductCreate(BaseModel):
    shopify_product_id: str
    name: str
    sku: str
    barcode: Optional[str] = None
    price: Optional[float] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    barcode: Optional[str] = None
    price: Optional[float] = None