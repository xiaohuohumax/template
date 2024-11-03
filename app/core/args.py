import argparse
from pathlib import Path
from typing import Optional

from pydantic import BaseModel, Field, computed_field


class Args(BaseModel):
    mode: Optional[str] = Field(default="dev", description="Running mode")
    config_folder: Optional[Path] = Field(
        default_factory=lambda: Path("config"),
        description="Configuration folder path for configuration files",
    )
    env_folder: Optional[Path] = Field(
        default_factory=lambda: Path("."),
        description="Environment variable folder path for environment variable files",
    )

    @computed_field
    @property
    def is_prod(self) -> bool:
        return self.mode == "prod"


parser = argparse.ArgumentParser(
    prog="python -m app",
    add_help=False,
    description="Welcome to python-fastapi-template app",
)
parser.add_argument(
    "-h",
    "--help",
    action="help",
    help="Show this help message and exit",
)
parser.add_argument(
    "-m", "--mode", dest="mode", type=str, default="dev", help="Running mode"
)
parser.add_argument(
    "-c",
    "--config-folder",
    dest="config_folder",
    type=str,
    default=Path("config"),
    help="Configuration folder path for configuration files",
)
parser.add_argument(
    "-e",
    "--env-folder",
    dest="env_folder",
    type=str,
    default=Path("."),
    help="Environment variable folder path for environment variable files",
)


def parse_args() -> Args:
    args_dict = vars(parser.parse_args())
    return Args.model_validate(args_dict)


args = parse_args()
