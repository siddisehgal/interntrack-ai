from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    college: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None


class UserOut(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    college: Optional[str]
    branch: Optional[str]
    year: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None