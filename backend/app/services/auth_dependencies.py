"""
Shared authentication dependency for all routers.

Every protected route should use:
    from app.services.auth_dependencies import get_current_user
    ...
    def my_route(current_user: User = Depends(get_current_user)):

This replaces the copy-pasted get_current_user() that previously lived
separately in routers/auth.py and routers/internships.py (and was
missing entirely from routers/assistant.py, resume.py, interview.py).
"""

from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.database import get_db
from app.config import settings
from app.services.auth import get_user_by_email
from app.models.user import User


def get_current_user(
    authorization: str | None = Header(None),
    db: Session = Depends(get_db),
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.split(" ", 1)[1]

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
