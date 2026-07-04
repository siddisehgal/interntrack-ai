import traceback
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

try:
    response = client.post(
        "/auth/login",
        json={"email": "test+1@example.com", "password": "TestPass123"},
    )
    print("status", response.status_code)
    print("body", response.text)
    print("headers", response.headers)
except Exception:
    traceback.print_exc()
