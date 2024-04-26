from functools import wraps
import inspect

from sqlmodel import Session, create_engine

from .config import config

db_config = config.database

# 默认使用 mysql+pymysql 驱动
url = 'mysql+pymysql://{}:{}@{}:{}/{}'.format(
    db_config.username,
    db_config.password,
    db_config.host,
    db_config.port,
    db_config.database_name
)

engine = create_engine(
    url,
    echo=db_config.echo,
    pool_size=db_config.pool_size,
    max_overflow=db_config.max_overflow,
    pool_timeout=db_config.pool_timeout,
    pool_recycle=db_config.pool_recycle,
)


def with_db_session(func):
    """
    装饰器，用于获取数据库连接，回滚事务

    1. 在函数参数中添加 Session 类型参数，并使用 with_db_session 装饰器修饰该函数
    2. 在函数中使用 session 进行数据库操作，并在函数返回前调用 session.commit() 进行提交事务

    示例：
    ```python
    @with_db_session
    def get_user(session: Session, user_id: int):
        query_select = select(UserModel).where(UserModel.id == user_id)
        return session.exec(query_select).first()
    ```
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        func_params = inspect.signature(func).parameters
        arg_name = None
        for name, param in func_params.items():
            if param.annotation == Session:
                arg_name = name
                break
        if arg_name is None:
            return func(*args, **kwargs)
        else:
            # 存在 session 参数
            with Session(engine) as session:
                kwargs[arg_name] = session
                return func(*args, **kwargs)
    return wrapper


def close():
    """
    关闭数据库连接
    """
    engine.dispose()
