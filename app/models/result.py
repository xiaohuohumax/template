from typing import Generic, List, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T", bound=BaseModel)


class MessageResult(BaseModel):
    message: str = Field(description="Message")


class ExceptionResult(BaseModel):
    detail: str = Field(description="Detail")


class PageResult(BaseModel, Generic[T]):
    items: List[T] = Field(default=[], description="List of items")
    total: int = Field(default=0, description="Total number of items")
