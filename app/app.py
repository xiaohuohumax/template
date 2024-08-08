import logging
from typing import Any, List

from pydantic import BaseModel

from .args import Args, load_args
from .config import ProjectConfig, load_config_by_class
from .env import Env, load_env_by_mode
from .util.file import read_file
from .util.logging import config_logging

logger = logging.getLogger(__name__)


class FlowConfig(BaseModel):
    """
    流程配置
    """
    steps: List[Any] = []


class ProjectFlowConfig(BaseModel):
    """
    项目流程配置
    """
    # 流程配置
    flow: FlowConfig = FlowConfig()


class App:
    # 命令行参数
    args: Args
    # 环境变量
    env: Env
    # 项目配置
    config: ProjectConfig

    def _print_banner(self):
        """
        打印 banner
        """
        if not self.config.banner.enabled:
            return

        if not self.config.banner.file_path.exists():
            return

        print(read_file(self.config.banner.file_path))
        print(self.config.banner.welcome + '\n')

    def __init__(self):
        # 加载配置
        self.args = load_args()
        self.env = load_env_by_mode(self.args.mode)
        self.config = load_config_by_class(
            ProjectConfig, self.env.config_dir, self.env.mode)
        # 配置日志
        config_logging(self.config.logging.config_path,
                       self.config.logging.level)
        # 打印 banner
        self._print_banner()

        logger.info("Initializing app...")

    def run(self):
        """
        运行
        """
        try:
            logger.info("Running app...")

            logger.info(f"Configs: {self.config}")
            logger.info(f"Envs: {self.env}")
            logger.info(f"Args: {self.args}")

            logger.info("Running app finished")
        except Exception as e:
            logger.error(f"Running app failed: {e}")
            raise e
