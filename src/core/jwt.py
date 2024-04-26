from functools import wraps

from flask_jwt_extended import JWTManager, get_jwt

from util.result import Result, ResultCode

jwt = JWTManager()


def required_roles(roles=[]):
    """
    角色检查装饰器

    例如：
    ```python
    @app.route('/api/users')
    @required_roles(['admin', 'user'])
    def get_users():
        # 只有 admin 或 user 角色的用户才能访问此接口
        ...
    ```
    :param roles: 角色列表, defaults to []
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            claims_roles = claims.get('roles', [])

            for role in roles:
                if role in claims_roles:
                    return fn(*args, **kwargs)

            return Result.fail(
                code=ResultCode.UNAUTHORIZED,
                message='Insufficient permissions'
            ), 401

        return wrapper
    return decorator


def required_scope(scope):
    """
    资源权限检查装饰器

    例如：
    ```python
    @app.route('/api/users')
    @required_scope('read:users')
    def get_users():
        # 只有具有 read:users 资源权限的用户才能访问此接口
        ...
    ```
    :param scope: 资源名称
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            claims_scopes = claims.get('scopes', [])

            if scope in claims_scopes:
                return fn(*args, **kwargs)

            return Result.fail(
                code=ResultCode.UNAUTHORIZED,
                message='Insufficient permissions'
            ), 401

        return wrapper
    return decorator


@jwt.invalid_token_loader
@jwt.unauthorized_loader
def expired_token_callback(message):
    """
    token验证失败的回调函数

    :param message: 错误信息
    :return: 错误响应
    """
    return Result.fail(
        code=ResultCode.UNAUTHORIZED,
        message=message
    ), 401


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    """
    token过期的回调函数

    :return: 错误响应
    """
    return Result.fail(
        code=ResultCode.UNAUTHORIZED,
        message='Token expired'
    ), 401
