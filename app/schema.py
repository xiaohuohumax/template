from typing import Any, Dict

from pydantic.json_schema import GenerateJsonSchema
from pydantic_core.core_schema import ListSchema

from . import config


class CustomSchemaGenerator(GenerateJsonSchema):
    """
    自定义 schema 生成器
    """

    def literal_schema(self, schema: ListSchema):
        """
        处理 Literal 类型，将 const 类型中的 enum 属性删除
        """
        res = super().literal_schema(schema)
        if 'const' in res:
            del res['enum']
        return res

    def nullable_schema(self, schema):
        """
        处理 optional 类型，将 anyOf 类型转换为 oneOf 类型
        """
        schema = super().nullable_schema(schema)
        if 'anyOf' in schema:
            schema['oneOf'] = schema.pop('anyOf')
        return schema

    def union_schema(self, schema):
        """
        处理 union 类型，将所有 anyOf 类型转换为 oneOf 类型
        """
        schema = super().union_schema(schema)
        if 'anyOf' in schema:
            schema['oneOf'] = schema.pop('anyOf')
        return schema


def generate_config_schema() -> Dict[str, Any]:
    """
    生成配置文件 schema

    :return: 配置文件 schema
    """
    return config.ProjectConfig.model_json_schema(
        schema_generator=CustomSchemaGenerator
    )
