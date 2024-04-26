from enum import IntEnum
from typing import Any

from pydantic import BaseModel


class ResultCode(IntEnum):
    """
    状态码枚举
    """
    # 成功
    SUCCESS = 200
    # 失败
    FAIL = 500
    # 未授权
    UNAUTHORIZED = 401


class Result(BaseModel):
    """
    统一返回结果
    """
    code: ResultCode
    message: str
    data: Any

    @classmethod
    def success(cls, data: Any, message: str = 'success'):
        """
        成功返回

        :param data: 返回结果
        :param message: 返回消息, defaults to 'success'
        :return: 响应结果
        """
        return cls(code=ResultCode.SUCCESS, message=message, data=data).model_dump()

    @classmethod
    def fail(cls, code: ResultCode = ResultCode.FAIL, data: Any = None, message: str = 'fail'):
        """
        失败返回

        :param code: 状态码, defaults to ResultCode.FAIL
        :param data: 返回结果, defaults to None
        :param message: 返回消息, defaults to 'fail'
        :return: 响应结果
        """
        return cls(code=code, message=message, data=data).model_dump()
