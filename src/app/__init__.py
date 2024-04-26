import logging
from pathlib import Path

from util.file import read_file
from util.logging import config_logging
from core.config import config
from .main import app

# 初始化日志配置
config_logging(config.logging.config_path, config.logging.level)


def print_banner():
    """
    打印banner
    """
    if not config.banner.enabled:
        return

    banner_file = Path(config.banner.file_path)
    if not banner_file.exists():
        return

    empty_logger = logging.getLogger("empty_logger")
    empty_logger.info(read_file(banner_file))
    empty_logger.info(config.banner.welcome + '\n')


print_banner()

__all__ = ["app"]
