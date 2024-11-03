import uuid
from typing import List

from sqlalchemy.orm import Session

from app.models.query import PageQuery

from .models.user import User, UserCreate
from .utils import security_util


def create_user(*, session: Session, user_create: UserCreate) -> User:
    user = User.model_validate(
        user_create,
        update={"password": security_util.hash_password(user_create.password)},
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def get_user_by_username(*, session: Session, username: str) -> User:
    return session.query(User).filter(User.username == username).first()


def list_users(*, session: Session, page: PageQuery) -> List[User]:
    return session.query(User).offset(page.offset).limit(page.limit).all()


def count_users(*, session: Session) -> int:
    return session.query(User).count()


def authenticate(*, session: Session, username: str, password: str) -> User | None:
    user = get_user_by_username(session=session, username=username)
    if not user or not security_util.verify_password(password, user.password):
        return None
    return user


def get_user_by_id(*, session: Session, user_id: uuid.UUID) -> User:
    return session.query(User).filter(User.id == user_id).first()
