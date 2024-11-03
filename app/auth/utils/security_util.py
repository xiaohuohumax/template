from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from passlib.context import CryptContext

from app.core.config import config

crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    return jwt.encode(
        payload={"exp": expire, "sub": str(subject)},
        key=config.server.security.secret_key,
        algorithm=config.server.security.algorithm,
    )


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return crypt_context.verify(plain_password, hashed_password)


def hash_password(password: str) -> str:
    return crypt_context.hash(password)
