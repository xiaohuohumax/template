from fastapi import APIRouter

from .routers import login, user

router = APIRouter()

router.include_router(login.router)
router.include_router(user.router)
