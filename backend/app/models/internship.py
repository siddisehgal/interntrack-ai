from sqlalchemy import Column, String, Date, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from app.database import Base


class Internship(Base):
    __tablename__ = "internships"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    application_date = Column(Date, server_default=func.now())
    status = Column(String, nullable=False, default="Applied")
    notes = Column(Text, nullable=True)
    deadline = Column(Date, nullable=True)
