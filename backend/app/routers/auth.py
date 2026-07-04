from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.schemas.user import UserCreate, LoginRequest
from app.services.auth import (
    verify_password,
    get_user_by_email,
    create_access_token,
    create_user,
)
from app.services.auth_dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/register")
def register(request: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, request.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = create_user(db, request)
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, request.email)
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "email": current_user.email,
        "name": current_user.name,
        "college": current_user.college,
        "branch": current_user.branch,
        "year": current_user.year,
    }
