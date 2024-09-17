from pydantic import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str
    SHOPIFY_API_KEY: str
    SHOPIFY_API_SECRET: str
    SENDLE_API_KEY: str
    JWT_SECRET_KEY: str
    JWT_EXPIRATION_MINUTES: int
    GOOGLE_CLOUD_PROJECT: Optional[str]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()