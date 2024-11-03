import uuid

from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    username: str = Field(max_length=30, unique=True, description="Username")


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40, description="Password")


class User(UserBase, table=True):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4, primary_key=True, description="User ID"
    )
    password: str = Field(description="Password(hashed)", max_length=255)


class UserPublic(UserBase):
    id: uuid.UUID = Field(description="User ID")
