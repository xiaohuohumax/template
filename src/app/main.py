import logging

from core.config import config
from core.args import args
from core.env import env

logger = logging.getLogger(__name__)


def run():
    logger.info("Running app...")
    logger.info(f"Configs: {config}")
    logger.info(f"Args: {args}")
    logger.info(f"Envs: {env}")
