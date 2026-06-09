from fastapi import FastAPI
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database.base import Base

from app.models.user import User
from app.models.product import Product

from app.routes.auth import router as auth_router
from app.routes.protected import router as protected_router
from app.routes.product import router as product_router

security = HTTPBearer()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Crypto Alert System API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(protected_router)
app.include_router(product_router)

@app.get("/")
def root():
    return {
        "message": "Crypto Alert API Running"
    }