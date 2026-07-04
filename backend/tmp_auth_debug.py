import json
import urllib.request
import urllib.error

from app.database import SessionLocal
from app.models.user import User
from app.services.password import verify_password


def query_user(email: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).one_or_none()
        print('user', user)
        if user:
            print('hashed_password repr:', repr(user.hashed_password))
            print('hashed_password len:', len(user.hashed_password))
            print('verify password direct:', verify_password('password', user.hashed_password))
    finally:
        db.close()


def call(path: str, payload: dict):
    url = 'http://127.0.0.1:8002' + path
    body = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(path, resp.status)
            print(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as exc:
        print(path, 'HTTP', exc.code)
        print(exc.read().decode('utf-8'))
    except Exception as exc:
        print(path, 'ERROR', type(exc).__name__, exc)


if __name__ == '__main__':
    query_user('test+1@example.com')
    print('--- calling login ---')
    call('/auth/login', {'email': 'test+1@example.com', 'password': 'password'})
    print('--- calling register ---')
    call('/auth/register', {'name': 'Debug User', 'email': 'debug2@example.com', 'password': 'Password123!'})
