from pydantic import BaseModel, Field

class ProductCreate(BaseModel):
    name: str = Field(
        min_length=3,
        max_length=50
    )

    description: str = Field(
        min_length=5,
        max_length=500
    )

    price: float = Field(
        gt=0
    )


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True