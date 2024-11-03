import logging
from copy import deepcopy
from pathlib import Path
from typing import Literal, Optional

from pydantic import BaseModel, Field

from ..utils import file_util
from .args import args

logger = logging.getLogger(__name__)

LoggingLevel = Literal[
    "CRITICAL",
    "FATAL",
    "ERROR",
    "WARN",
    "WARNING",
    "INFO",
    "DEBUG",
    "NOTSET",
]


class LoggingConfig(BaseModel):
    level: Optional[LoggingLevel] = Field(default=None, description="Logging level")


class AppConfig(BaseModel):
    logging: LoggingConfig = Field(
        default=LoggingConfig(), description="Logging configuration"
    )


def _merge_config(c1: dict, c2: dict) -> dict:
    result = deepcopy(c1)

    for k, v in c2.items():
        if isinstance(v, dict) and k in result and isinstance(result[k], dict):
            result[k] = _merge_config(result[k], v)
        else:
            result[k] = v

    return result


def load_config(config_folder: Path, mode: str) -> AppConfig:
    files = [
        Path(config_folder, "application.yml"),
        Path(config_folder, "application.yaml"),
        Path(config_folder, f"application.{mode}.yml"),
        Path(config_folder, f"application.{mode}.yaml"),
    ]

    config: dict = {}

    for file in files:
        if not file.exists():
            continue

        config_content = file_util.read_yaml(file)
        if not isinstance(config_content, dict):
            continue
        config = _merge_config(config, config_content)

    return AppConfig.model_validate(config)


config = load_config(args.config_folder, args.mode)
