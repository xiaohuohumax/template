import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.dependencies.session import SessionDep
from app.models.query import PageQuery
from app.models.result import ExceptionResult, MessageResult, PageResult

from .. import service
from ..dependencies.current_user import CurrentUserDep, get_current_user
from ..models.user import UserCreate, UserPublic

router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(get_current_user)],
    responses={
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Not authenticated",
            "model": ExceptionResult,
        },
    },
)


@router.post(
    "",
    response_model=UserPublic,
    responses={
        status.HTTP_400_BAD_REQUEST: {
            "description": "Username already exists",
            "model": ExceptionResult,
        }
    },
)
def create_user(*, session: SessionDep, user_create: UserCreate):
    db_user = service.get_user_by_username(
        session=session, username=user_create.username
    )
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists"
        )
    return service.create_user(session=session, user_create=user_create)


@router.get("", response_model=PageResult[UserPublic])
def get_users(*, session: SessionDep, page: PageQuery = Query()):
    users = service.list_users(session=session, page=page)
    total = service.count_users(session=session)
    return PageResult[UserPublic](total=total, items=users)


@router.get(
    "/{user_id}",
    response_model=UserPublic,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "User not found",
            "model": ExceptionResult,
        }
    },
)
def get_user(*, session: SessionDep, user_id: uuid.UUID):
    user = service.get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return user


@router.delete(
    "/{user_id}",
    response_model=MessageResult,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "User not found",
            "model": ExceptionResult,
        }
    },
)
def delete_user(*, session: SessionDep, user_id: uuid.UUID):
    user = service.get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    session.delete(user)
    session.commit()
    return MessageResult(message="User deleted successfully")


@router.get("/current", response_model=UserPublic)
def get_current_user(*, current_user: CurrentUserDep):
    return current_user
