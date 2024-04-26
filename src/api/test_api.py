from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlmodel import Session

from core.db import with_db_session
from core.jwt import required_roles
from util.result import Result
from service import user_service


blueprint = Blueprint('test', __name__)


@blueprint.route('/admin')
@jwt_required()
@required_roles(roles=['admin'])
@with_db_session
def admin_api(session: Session):
    """
    测试 admin 权限接口

    :param session: sqlmodel session
    :return: Result
    """
    user = user_service.get_user_by_id(session, get_jwt_identity())
    del user.password
    return Result.success(message='request admin api success', data=user)


@blueprint.route('/user')
@jwt_required()
@required_roles(roles=['user'])
@with_db_session
def user_api(session: Session):
    """
    测试 user 权限接口

    :param session: sqlmodel session
    :return: Result
    """
    user = user_service.get_user_by_id(session, get_jwt_identity())
    del user.password
    return Result.success(message='request user api success', data=user)
