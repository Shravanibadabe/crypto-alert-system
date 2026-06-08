from fastapi import APIRouter
from fastapi import Depends

from app.middleware.auth_middleware import (
    get_current_user
)

from app.middleware.role_middleware import (
    admin_required
)

router = APIRouter(
    prefix="/api/v1",
    tags=["Protected Routes"]
)

@router.get("/profile")
def profile(
    current_user=Depends(
        get_current_user
    )
):

    return {
        "message": "Profile Access Success",
        "user": current_user
    }


@router.get("/admin")
def admin_dashboard(
    current_user=Depends(
        admin_required
    )
):

    return {
        "message": "Welcome Admin",
        "user": current_user
    }