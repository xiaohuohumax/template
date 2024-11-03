from pydantic import BaseModel, Field


class Token(BaseModel):
    access_token: str = Field(description="Access token for authentication")
    token_type: str = Field(default="bearer", description="Type of token")


class TokenPayload(BaseModel):
    sub: str = Field(description="Subject of the token")
