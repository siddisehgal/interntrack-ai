import json
from urllib import request, error
from app.database import SessionLocal
from app.models.user import User

BASE = "http://127.0.0.1:8000"
headers = {"Content-Type": "application/json", "Origin": "http://localhost:5174"}

TEST_EMAIL = "test+1@example.com"
TEST_PASSWORD = "TestPass123"
TEST_NAME = "Test User"


def post(path, data):
    req = request.Request(
        BASE + path,
        data=json.dumps(data).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    try:
        with request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, body
    except error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8")
    except Exception as exc:
        return None, str(exc)


def check_user():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == TEST_EMAIL).first()
        if user:
            print("User exists in DB:", user.email)
            print("Hashed password:", user.hashed_password)
            return True
        print("User does not exist in DB")
        return False
    finally:
        db.close()


def register_user():
    status, body = post("/auth/register", {"name": TEST_NAME, "email": TEST_EMAIL, "password": TEST_PASSWORD})
    print("REGISTER status:", status)
    print(body)
    return status == 200


def login_user():
    status, body = post("/auth/login", {"email": TEST_EMAIL, "password": TEST_PASSWORD})
    print("LOGIN status:", status)
    print(body)
    return status, body


if __name__ == "__main__":
    print("1) Exact /auth/login response")
    login_user()

    print("\n2) Check DB for test user")
    if not check_user():
        print("\n3) Registering test user")
        register_user()
        print("\n4) Retry login")
        login_user()
    else:
        print("\n3) User already exists, retry login")
        login_user()
