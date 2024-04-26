from typing import Optional

from sqlmodel import Field, SQLModel


class UserModel(SQLModel, table=True):
    """
    User实体映射类
    """
    __tablename__ = 'user'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    password: str
    roles: str
