from pydantic_settings import BaseSettings


class Env(BaseSettings, case_sensitive=False):
    """
    环境变量 (忽略大小写)
    """

    # 环境模式
    mode: str = 'dev'

    # 配置文件存放目录
    config_folder_path: str = 'config'


# 环境变量
env = Env()
