from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate
from app.middleware.auth_middleware import get_current_user

router = APIRouter(
    prefix="/api/v1/products",
    tags=["Products"]
)

# =========================
# CREATE PRODUCT (ADMIN ONLY)
# =========================
@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.get("role") != "admin":
        raise HTTPException(
        status_code=403,
        detail="Only Admin Can Create Products"
    )

    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# =========================
# GET ALL PRODUCTS
# =========================
@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


# =========================
# GET SINGLE PRODUCT
# =========================
@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# =========================
# UPDATE PRODUCT (ADMIN ONLY)
# =========================
@router.put("/{product_id}")
def update_product(
    product_id: int,
    updated: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only Admin Can Update Products"
        )

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = updated.name
    product.description = updated.description
    product.price = updated.price

    db.commit()

    return {
        "message": "Product Updated Successfully"
    }


# =========================
# DELETE PRODUCT (ADMIN ONLY)
# =========================
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only Admin Can Delete Products"
        )

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product Deleted Successfully"
    }