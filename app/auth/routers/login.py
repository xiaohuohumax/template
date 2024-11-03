from datetime import timedelta

from fastapi import APIRouter, HTTPException, status

from app.dependencies.session import SessionDep
from app.models.result import ExceptionResult

from .. import service
from ..dependencies.oauth_from_data import OAuthFromDataDep
from ..models.token import Token
from ..utils import security_util

router = APIRouter(prefix="/login", tags=["login"])


@router.post(
    "",
    response_model=Token,
    responses={
        status.HTTP_400_BAD_REQUEST: {
            "description": "Incorrect username or password",
            "model": ExceptionResult,
        }
    },
)
def login(*, session: SessionDep, from_data: OAuthFromDataDep):
    user = service.authenticate(
        session=session,
        username=from_data.username,
        password=from_data.password,
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )

    return Token(
        access_token=security_util.create_access_token(
            subject=user.id, expires_delta=timedelta(minutes=30)
        )
    )
