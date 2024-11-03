from pathlib import Path
from typing import Any, List


def read_file(file: Path, encoding="utf-8") -> str:
    with open(file, "r", encoding=encoding) as f:
        return f.read()


def write_file(file: Path, content: str, encoding="utf-8") -> None:
    file.parent.mkdir(parents=True, exist_ok=True)
    with open(file, "w", encoding=encoding) as f:
        f.write(content)


def reade_lines(file: Path, encoding="utf-8") -> List[str]:
    return read_file(file, encoding).splitlines()


def read_yaml(file: Path, encoding="utf-8") -> Any:
    from ruamel.yaml import YAML

    file_content = read_file(file, encoding)
    return YAML(typ="safe").load(file_content)
