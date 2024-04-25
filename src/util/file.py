from typing import Any

from ruamel.yaml import YAML


def read_file(file_path: str, encoding: str = 'utf8') -> str:
    """
    读取文件内容

    :param file_path: 文件路径
    :param encoding: 编码格式默认utf8
    :return: 文件内容
    """
    with open(file_path, encoding=encoding) as f:
        return f.read()


def read_yaml_file(file_path: str, encoding: str = 'utf8') -> Any:
    """
    读取yaml文件

    :param file_path: 文件路径
    :param encoding: 编码格式默认utf8
    :return: yaml文件内容
    """
    return YAML(typ='safe').load(read_file(file_path, encoding))
