import logging
from pathlib import Path

import uvicorn

from .app import app
from .core.args import args
from .core.config import config
from .core.env import env
from .core.log import configure_logging
from .utils import file_util

logger = logging.getLogger(__name__)
banner_file = Path("banner.txt")

configure_logging(config_folder=args.config_folder, level=config.logging.level)


def banner(file: Path):
    if not file.exists():
        return
    print(file_util.read_file(file))


def main():
    banner(banner_file)
    logger.info("Starting app...")
    logger.debug(f"Args: {args}")
    logger.debug(f"Config: {config}")
    logger.debug(f"Env: {env}")
    uvicorn.run(
        app,
        host=config.server.host,
        port=config.server.port,
        log_config=None,
    )


if __name__ == "__main__":
    main()
