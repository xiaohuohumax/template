from flask import Flask

from .login_api import blueprint as login_blueprint
from .test_api import blueprint as test_blueprint


def register_apis(app: Flask):
    """
    注册全部api蓝图

    :param app: Flask应用实例
    """
    # 登录
    app.register_blueprint(login_blueprint, url_prefix='/login')
    # 测试
    app.register_blueprint(test_blueprint, url_prefix='/test')
