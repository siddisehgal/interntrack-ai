from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from jose import jwt

from app.models.user import User
from app.config import settings
from app.services.password import hash_password, verify_password


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_data):
    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        college=user_data.college,
        branch=user_data.branch,
        year=user_data.year,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
