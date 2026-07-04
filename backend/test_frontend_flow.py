import json
from urllib import request, error

BASE = "http://127.0.0.1:8000"


def send_request(method, path, body=None, origin=None):
    url = BASE + path
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
    }
    if origin:
        headers["Origin"] = origin
    if method == "OPTIONS":
        headers["Access-Control-Request-Method"] = "POST"
    req = request.Request(url, data=data, headers=headers, method=method)
    try:
        with request.urlopen(req, timeout=10) as resp:
            print(f"{method} {path} -> {resp.status}")
            print("Headers:")
            for name, value in resp.getheaders():
                if name.lower().startswith("access-control") or name.lower() == "content-type":
                    print(f"  {name}: {value}")
            print("Body:", resp.read().decode("utf-8"))
    except error.HTTPError as exc:
        print(f"{method} {path} -> {exc.code}")
        print("Headers:")
        for name, value in exc.headers.items():
            if name.lower().startswith("access-control") or name.lower() == "content-type":
                print(f"  {name}: {value}")
        print("Body:", exc.read().decode("utf-8"))
    except Exception as exc:
        print(f"{method} {path} -> ERROR: {exc}")


if __name__ == "__main__":
    origin = "http://localhost:5174"
    print("=== OPTIONS ===")
    send_request("OPTIONS", "/auth/login", origin=origin)
    print("=== POST LOGIN ===")
    send_request(
        "POST",
        "/auth/login",
        body={"email": "test+1@example.com", "password": "TestPass123"},
        origin=origin,
    )
