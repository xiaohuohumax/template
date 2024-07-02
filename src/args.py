import argparse
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class ArgsSubCommand(Enum):
    """
    子命令枚举
    """
    SUB1 = 'sub1'


class Args(BaseModel):
    """
    命令行参数
    """

    # 参数
    argument1: str = ''

    # 其他参数自行扩展
    ...

    # 子命令状态
    sub_command: Optional[ArgsSubCommand] = None

    # 子命令参数格式推荐 子命令名_参数名
    sub1_argument1: str = ''


# 默认参数
_default_args = Args()

_parser = argparse.ArgumentParser(description="")
_parser.add_argument('-a', '--argument1', dest='argument1', type=str,
                     default=_default_args.argument1, help='参数1')

# 子命令
_subparser = _parser.add_subparsers(help='sub commands', dest='sub_command')

# sub1 command
_sub1_parser = _subparser.add_parser(
    ArgsSubCommand.SUB1.value, help='子命令')
_sub1_parser.set_defaults(sub_command=ArgsSubCommand.SUB1)
_sub1_parser.add_argument('-s,--sub1-argument1', dest='sub1_argument1',
                          default=_default_args.sub1_argument1, help='子命令参数1')

# 命令行参数
args = Args.model_validate(vars(_parser.parse_args()))
