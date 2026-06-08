from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.user import User
from app.middleware.auth_middleware import get_current_user

from app.schemas.user import (
    UserRegister,
    UserLogin
)

from app.utils.hash import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import (
    create_access_token
)

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
    name=user.name,
    email=user.email,
    password=hash_password(user.password),
    role="user"
)

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message":
        "User registered successfully"
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "id": db_user.id,
            "role": db_user.role
        }
    )

    return {
    "access_token": token,
    "token_type": "bearer",
    "id": db_user.id,
    "name": db_user.name,
    "email": db_user.email,
    "role": db_user.role
}
from app.middleware.role_middleware import admin_required

@router.get("/users")
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return db.query(User).all()