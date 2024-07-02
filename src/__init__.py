from pathlib import Path

from .util.file import read_file
from .util.logging import config_logging
from .config import config
from .app import App

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

    print(read_file(banner_file))
    print(config.banner.welcome + '\n')


print_banner()

__all__ = ["App"]
