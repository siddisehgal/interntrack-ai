import json
import urllib.request
import urllib.error

from app.database import SessionLocal
from app.models.user import User
from app.services.password import verify_password


def print_user(email: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).one_or_none()
        print(f'user {email}:', user)
        if user:
            print('  hash repr:', repr(user.hashed_password))
            print('  hash len:', len(user.hashed_password))
            for pwd in ['password', 'TestPass123', 'Password123!']:
                print('  verify', pwd, verify_password(pwd, user.hashed_password))
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
    print_user('test+1@example.com')
    print('--- login attempt for test+1@example.com')
    call('/auth/login', {'email': 'test+1@example.com', 'password': 'password'})
    call('/auth/login', {'email': 'test+1@example.com', 'password': 'TestPass123'})
    print('--- register+login debug user')
    call('/auth/register', {'name': 'Debug User', 'email': 'debug-user@example.com', 'password': 'Password123!', 'college': 'Test', 'branch': 'CS', 'year': 2025})
    call('/auth/login', {'email': 'debug-user@example.com', 'password': 'Password123!'})
