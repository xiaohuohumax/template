import json
from pathlib import Path

from pydantic.json_schema import GenerateJsonSchema
from pydantic_core.core_schema import ListSchema

from app.core.config import AppConfig
from app.utils import file_util


def write_json(data: dict, file: Path):
    json_content = json.dumps(
        data,
        indent=2,
        ensure_ascii=False,
    )
    file_util.write_file(file, json_content)


class CustomSchemaGenerator(GenerateJsonSchema):
    def literal_schema(self, schema: ListSchema):
        res = super().literal_schema(schema)
        if "const" in res:
            del res["enum"]
        return res

    def nullable_schema(self, schema):
        schema = super().nullable_schema(schema)
        if "anyOf" in schema:
            schema["oneOf"] = schema.pop("anyOf")
        return schema

    def union_schema(self, schema):
        schema = super().union_schema(schema)
        if "anyOf" in schema:
            schema["oneOf"] = schema.pop("anyOf")
        return schema


if __name__ == "__main__":
    schema_file = Path("schema/application.schema.json")

    schema_dict = AppConfig.model_json_schema(
        schema_generator=CustomSchemaGenerator,
    )

    write_json(schema_dict, schema_file)

    print(f"Schema file written to {schema_file}")
