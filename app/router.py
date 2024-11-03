from fastapi import APIRouter

from . import auth
from .core.env import env

router = APIRouter()

router.include_router(auth.router, prefix=env.API_PREFIX)
