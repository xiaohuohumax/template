from pathlib import Path

from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings

from .args import args


class Env(BaseSettings, case_sensitive=False):
    APP_NAME: str = Field("", description="Application name")
    # api proxy(nginx...), e.g. / => /api/v1
    API_PREFIX: str = Field("", description="API prefix")


def load_env(env_folder: Path, mode: str) -> Env:
    files = [
        Path(env_folder, ".env"),
        Path(env_folder, ".env.local"),
        Path(env_folder, f".env.{mode}"),
        Path(env_folder, f".env.{mode}.local"),
    ]

    for file in files:
        if not file.exists():
            continue
        load_dotenv(dotenv_path=file, override=True)

    return Env()


env = load_env(args.env_folder, args.mode)
