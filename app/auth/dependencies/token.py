from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from app.core.env import env

get_token = OAuth2PasswordBearer(tokenUrl=f"{env.API_PREFIX}/login")

TokenDep = Annotated[str, Depends(get_token)]
