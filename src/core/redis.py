from flask_redis import FlaskRedis

from .config import config

redis_config = config.redis

redis_url = "redis://{}:{}@{}:{}/{}".format(
    redis_config.username,
    redis_config.password,
    redis_config.host,
    redis_config.port,
    redis_config.db
)

redis_client = FlaskRedis()
