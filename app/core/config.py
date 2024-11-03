import logging
from copy import deepcopy
from pathlib import Path
from typing import List, Literal, Optional, Union

from pydantic import BaseModel, Field, computed_field

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


class CorsConfig(BaseModel):
    enabled: bool = Field(default=True, description="Whether to enable CORS")
    allow_origins: List[str] = Field(
        default_factory=lambda: ["*"], description="Allowed origins"
    )
    allow_methods: List[str] = Field(
        default_factory=lambda: ["*"], description="Allowed methods"
    )
    allow_headers: List[str] = Field(
        default_factory=lambda: ["*"], description="Allowed headers"
    )
    allow_credentials: bool = Field(
        default=True, description="Whether to allow credentials"
    )


class SecurityConfig(BaseModel):
    secret_key: str = Field(default="1234567890", description="Security key")
    algorithm: Literal["HS256"] = Field(
        default="HS256", description="Encryption algorithm"
    )


class DatabaseConfig(BaseModel):
    type: Literal["unknown"] = Field(default="unknown", description="Database type")

    @computed_field
    @property
    def url(self) -> str:
        return ""


class MySQLDatabaseConfig(DatabaseConfig):
    type: Literal["mysql"] = Field(default="mysql", description="Database type")
    host: str = Field(default="localhost", description="Database address")
    port: int = Field(default=3306, description="Database port")
    username: str = Field(default="", description="Database username")
    password: str = Field(default="", description="Database password")
    database: str = Field(default="", description="Database name")

    @computed_field
    @property
    def url(self) -> str:
        return f"mysql+pymysql://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"


class SQLiteDatabaseConfig(DatabaseConfig):
    type: Literal["sqlite"] = Field(default="sqlite", description="Database type")
    file: Path = Field(
        default_factory=lambda: Path("data.sqlite"), description="Database file path"
    )

    @computed_field
    @property
    def url(self) -> str:
        return f"sqlite:///{self.file}"


class ServerConfig(BaseModel):
    host: str = Field(default="localhost", description="Service listen address")
    port: int = Field(default=8080, description="Service listen port")
    cors: CorsConfig = Field(default=CorsConfig(), description="CORS configuration")
    security: SecurityConfig = Field(
        default=SecurityConfig(), description="Security configuration"
    )
    database: Union[MySQLDatabaseConfig, SQLiteDatabaseConfig] = Field(
        default=SQLiteDatabaseConfig(), description="Database configuration"
    )


class AppConfig(BaseModel):
    logging: LoggingConfig = Field(
        default=LoggingConfig(), description="Logging configuration"
    )
    server: ServerConfig = Field(
        default=ServerConfig(), description="Server configuration"
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
