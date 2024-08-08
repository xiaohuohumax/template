import json
from pathlib import Path
from typing import Any, Dict

from app import __version__ as version
from app import schema
from app.util import file

schema_folder = Path("schema")
config_schema_name = "schema.json"


def write_schema_file(schema_dict: Dict[str, Any], file_path: Path):
    """
    写入 schema 文件

    :param schema_dict: schema dict
    :param file_path: 文件路径
    """
    schema = json.dumps(schema_dict, ensure_ascii=False, indent=4)
    file.write_file(file_path, schema)


if __name__ == '__main__':
    try:
        print("generating app schema...")
        print(f"version: {version}")
        # 配置文件 schema
        config_json_schema = schema.generate_config_schema()

        write_schema_file(config_json_schema, schema_folder/config_schema_name)
        write_schema_file(
            config_json_schema,
            schema_folder/version/config_schema_name
        )
        print(f"config schema generated: {schema_folder/config_schema_name}")

        print("app schema generated successfully.")
    except Exception as e:
        print(f"Failed to generate app schema: {e}")
