import logging.config
from pathlib import Path
from typing import Optional

from ..utils import file_util


def configure_logging(config_folder: Path, level: Optional[str]):
    config_files = [
        Path(config_folder, "logging.yml"),
        Path(config_folder, "logging.yaml"),
    ]

    config_file = next((f for f in config_files if f.exists()), None)
    if config_file is None or not config_file.exists():
        return

    logging_config = file_util.read_yaml(config_file)

    for handler in logging_config.get("handlers", {}).values():
        class_name = handler.get("class", "")
        if class_name != "logging.handlers.RotatingFileHandler":
            continue
        Path(handler["filename"]).parent.mkdir(parents=True, exist_ok=True)

    if level is not None:
        logging.root.setLevel(level)

    logging.config.dictConfig(config=logging_config)
