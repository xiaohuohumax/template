from typing import Optional
from pathlib import Path
import logging.config

from .file import read_yaml_file


def config_logging(config_path: str, level: Optional[str]) -> None:
    """
    配置日志

    :param config_path: 日志配置文件路径
    :param level: 日志级别
    """
    # 读取日志配置
    log_config = read_yaml_file(config_path)

    # 当日志文件夹不存在时，创建日志文件夹
    for handler in log_config.get('handlers', {}).values():
        if handler['class'] == 'logging.handlers.RotatingFileHandler':
            log_directory = Path(handler['filename']).parent
            if not log_directory.exists():
                log_directory.mkdir(parents=True, exist_ok=True)

    # 设置日志级别
    if level is not None:
        log_config.get('root', {})['level'] = level.upper()

    # 设置日志配置
    logging.config.dictConfig(config=log_config)
