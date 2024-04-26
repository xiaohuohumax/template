from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from sqlmodel import Session

from core.db import with_db_session
from service import user_service
from util.result import Result


blueprint = Blueprint('login', __name__)


@blueprint.route('', methods=['POST'])
@with_db_session
def login(session: Session):
    """
    登录

    :param session: sqlmodel session
    :return: Result
    """

    name = request.json.get('name')
    password = request.json.get('password')

    user = user_service.get_user_by_password(session, name, password)

    if not user:
        return Result.fail(message='Invalid username or password')

    access_token = create_access_token(
        identity=user.id,
        additional_claims={
            'roles': user.roles.split('|'),
            'scopes': []
        }
    )

    del user.password

    return Result.success(data={'access_token': access_token, 'user': user})
