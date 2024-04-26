from http.client import HTTPException
import logging

from flask import Flask
from flask_cors import CORS

from core.config import config
from core.env import env
from core.jwt import jwt
from api import register_apis
from util.result import Result


logger = logging.getLogger(__name__)


app = Flask(__name__)

# 日志
app.logger.handlers = logging.root.handlers
app.logger.setLevel(config.logging.level)

# 跨域
CORS(app)

# jwt
app.config["JWT_SECRET_KEY"] = config.app.jwt_secret_key
jwt.init_app(app)

# apis
register_apis(app)


@app.errorhandler(Exception)
def global_error_handler(e: Exception):
    """
    全局异常捕获
    """
    if isinstance(e, HTTPException):
        return e
    logger.exception(e)
    return Result.fail(message=str(e))


@app.before_request
def before_request():
    """
    请求前处理
    """
    pass


logger.info("Running app...")
logger.info(f"Configs: {config}")
logger.info(f"Envs: {env}")
