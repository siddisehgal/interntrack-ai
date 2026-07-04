from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database import get_db
from app.models.internship import Internship
from app.models.user import User
from app.services.auth_dependencies import get_current_user
from app.services.schemas.internship import (
    InternshipCreate,
    InternshipOut,
    InternshipUpdate,
)

router = APIRouter()


@router.post("/", response_model=InternshipOut)
def create_internship(
    internship: InternshipCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    obj = Internship(
        user_id=current_user.id,
        company=internship.company,
        role=internship.role,
        application_date=internship.application_date,
        status=internship.status or "Applied",
        notes=internship.notes,
        deadline=internship.deadline,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.get("/", response_model=List[InternshipOut])
def list_internships(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return db.query(Internship).filter(Internship.user_id == current_user.id).all()


@router.put("/{internship_id}", response_model=InternshipOut)
def update_internship(
    internship_id: UUID,
    payload: InternshipUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    obj = db.query(Internship).filter(
        Internship.id == internship_id, Internship.user_id == current_user.id
    ).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")

    for k, v in payload.dict(exclude_unset=True).items():
        setattr(obj, k, v)

    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{internship_id}")
def delete_internship(
    internship_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    obj = db.query(Internship).filter(
        Internship.id == internship_id, Internship.user_id == current_user.id
    ).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
