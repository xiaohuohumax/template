from typing import Optional

from sqlmodel import Session, select

from model.user_model import UserModel


def get_user_by_password(session: Session, name: str, password: str) -> Optional[UserModel]:
    """
    通过用户名和密码获取用户信息

    :param session: Session
    :param name: 用户名
    :param password: 密码
    :return: UserModel对象
    """
    query_select = select(UserModel).where(
        UserModel.name == name,
        UserModel.password == password
    )
    return session.exec(query_select).first()


def get_user_by_id(session: Session, user_id: int) -> Optional[UserModel]:
    """
    通过用户ID获取用户信息

    :param session: Session
    :param user_id: 用户ID
    :return: UserModel对象
    """
    query_select = select(UserModel).where(
        UserModel.id == user_id
    )
    return session.exec(query_select).first()
