import logging

from .config import config
from .args import args
from .env import env

logger = logging.getLogger(__name__)


class App:
    def run(self):
        logger.info("Running app...")
        logger.info(f"Configs: {config}")
        logger.info(f"Args: {args}")
        logger.info(f"Envs: {env}")
