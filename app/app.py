import logging
from contextlib import asynccontextmanager
from typing import AsyncIterator

import anyio.to_thread
from fastapi import FastAPI
from fastapi.routing import APIRoute

from .core.args import args
from .core.config import config
from .core.env import env
from .router import router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    limiter = anyio.to_thread.current_default_thread_limiter()
    # thread pool limiter
    limiter.total_tokens = 100
    # startup
    logger.debug("Starting up execution.")
    yield
    # shutdown
    logger.debug("Shutting down execution.")


def custom_generate_unique_id(route: APIRoute) -> str:
    # route.name => api function name
    return route.name


app = FastAPI(
    title=env.APP_NAME,
    docs_url=None if args.is_prod else f"{env.API_PREFIX}/docs",
    openapi_url=None if args.is_prod else f"{env.API_PREFIX}/openapi.json",
    redoc_url=None if args.is_prod else f"{env.API_PREFIX}/redoc",
    lifespan=lifespan,
    generate_unique_id_function=custom_generate_unique_id,
)

if config.server.cors.enabled:
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        **config.server.cors.model_dump(exclude={"enabled"}),
    )

app.include_router(router)
