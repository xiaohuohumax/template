from pydantic import BaseModel, Field


class PageQuery(BaseModel):
    offset: int = Field(default=0, ge=0, description="Offset of the first item")
    limit: int = Field(
        default=10, ge=1, le=100, description="Number of items to return"
    )
