from app.database import SessionLocal
from app.models.user import User
from app.services.password import hash_password


def create_or_update_test_user(email: str, password: str, name: str = "Frontend Test"):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).one_or_none()
        if user:
            user.hashed_password = hash_password(password)
            user.name = name
            print(f"Updated user {email}")
        else:
            user = User(name=name, email=email, hashed_password=hash_password(password))
            db.add(user)
            print(f"Created user {email}")
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    # Known credentials used by frontend tests
    EMAIL = "test@example.com"
    PASSWORD = "TestPass123"
    create_or_update_test_user(EMAIL, PASSWORD)
    print("Done")
