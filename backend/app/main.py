from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend.app.api.routes import auth, orders, inventory, settings
from backend.app.core.config import settings
from backend.app.db.database import engine, SessionLocal
from backend.app.db.models import Base

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)

# HUMAN ASSISTANCE NEEDED
# The confidence level for this function is below 0.8. Please review and adjust as necessary.
def configure_cors():
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def configure_routes():
    app.include_router(auth.router)
    app.include_router(orders.router)
    app.include_router(inventory.router)
    app.include_router(settings.router)

@app.on_event("startup")
def startup():
    create_tables()

# Call configuration functions
configure_cors()
configure_routes()