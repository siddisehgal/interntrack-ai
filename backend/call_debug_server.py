import json
from urllib import request, error

BASE = "http://127.0.0.1:8001"
HEADERS = {"Content-Type": "application/json"}

def post(path, payload):
    body = json.dumps(payload).encode("utf-8")
    req = request.Request(BASE + path, data=body, headers=HEADERS, method="POST")
    try:
        with request.urlopen(req, timeout=10) as resp:
            print(path, resp.status)
            print(resp.read().decode("utf-8"))
    except error.HTTPError as exc:
        print(path, exc.code)
        print(exc.read().decode("utf-8"))
    except Exception as exc:
        print(path, "ERROR", exc)

if __name__ == "__main__":
    print("LOGIN")
    post("/auth/login", {"email": "test+1@example.com", "password": "TestPass123"})
    print("REGISTER")
    post("/auth/register", {"name": "Debug User", "email": "debug@example.com", "password": "TestPass123"})
