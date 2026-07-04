from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date


class InternshipCreate(BaseModel):
    company: str
    role: str
    application_date: Optional[date]
    status: Optional[str] = "Applied"
    notes: Optional[str] = None
    deadline: Optional[date] = None


class InternshipUpdate(BaseModel):
    company: Optional[str]
    role: Optional[str]
    application_date: Optional[date]
    status: Optional[str]
    notes: Optional[str]
    deadline: Optional[date]


class InternshipOut(BaseModel):
    id: UUID
    user_id: UUID
    company: str
    role: str
    application_date: Optional[date]
    status: str
    notes: Optional[str]
    deadline: Optional[date]

    class Config:
        from_attributes = True
