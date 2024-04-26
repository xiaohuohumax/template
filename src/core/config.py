from typing import Optional

from pydantic import BaseModel, field_validator

from util.config import load_config
from .env import env


class LoggingConfig(BaseModel):
    """
    日志配置
    """
    # 日志级别
    level: Optional[str] = None
    # 日志配置文件路径
    config_path: str = "config/logging.yaml"

    @field_validator('level')
    def level_to_upper(cls, v):
        """
        日志级别转为大写

        :param v: 日志级别
        :return: 日志级别大写
        """
        return v.upper()


class BannerConfig(BaseModel):
    """
    banner配置
    """
    # 是否启用banner
    enabled: bool = True
    # banner文件路径
    file_path: str = "banner.txt"
    # 欢迎信息
    welcome: str = ""


class AppConfig(BaseModel):
    """
    应用配置
    """
    # 应用名称
    name: str = ""
    # jwt密钥
    jwt_secret_key: str = ""


class DatabaseConfig(BaseModel):
    """
    数据库配置
    """
    # 服务ip
    host: str = '0.0.0.0'
    # 服务端口
    port: int = 3306
    # 用户名
    username: str = ''
    # 密码
    password: str = ''
    # 数据库名
    database_name: str = ''
    # 是否显示sql语句
    echo: bool = True
    # 连接池大小
    pool_size: int = 20
    # 补充连接池大小(超过连接池pool_size大小时，创建新连接)
    max_overflow: int = 10
    # 链接回收时间 秒
    pool_recycle: int = 3600
    # 连接超时时间 秒
    pool_timeout: int = 30


class Config(BaseModel):
    """
    配置信息
    """
    # 应用配置
    app: AppConfig = AppConfig()
    # 日志配置
    logging: LoggingConfig = LoggingConfig()
    # banner
    banner: BannerConfig = BannerConfig()
    # 数据库配置
    database: DatabaseConfig = DatabaseConfig()


# 配置
config = load_config(Config, env.config_folder_path, env.mode)
