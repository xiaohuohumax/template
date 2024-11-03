import uuid
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError

from app.core.config import config
from app.dependencies.session import SessionDep

from ..models.token import TokenPayload
from ..models.user import User
from .token import TokenDep


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(
            token,
            config.server.security.secret_key,
            algorithms=[config.server.security.algorithm],
        )
        token_payload = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token or expired token",
        )

    user = session.get(User, uuid.UUID(token_payload.sub))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )
    return user


CurrentUserDep = Annotated[User, Depends(get_current_user)]
