import json
from urllib import request, error

BASE = "http://127.0.0.1:8000"

headers = {
    "Content-Type": "application/json",
    "Origin": "http://localhost:5174",
}

body = {"email": "test+1@example.com", "password": "TestPass123"}

def call(path, data):
    req = request.Request(
        BASE + path,
        data=json.dumps(data).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    try:
        with request.urlopen(req) as resp:
            text = resp.read().decode("utf-8")
            print(f"{path} {resp.status}")
            print(resp.headers)
            print(text)
            return resp.status, text
    except error.HTTPError as exc:
        print(f"{path} {exc.code}")
        print(exc.headers)
        print(exc.read().decode("utf-8"))
        return exc.code, exc.read().decode("utf-8")
    except Exception as exc:
        print("ERROR", exc)
        return None, str(exc)

if __name__ == "__main__":
    print("LOGIN CALL")
    call("/auth/login", body)
