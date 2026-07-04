import json
from urllib import request

BASE = 'http://127.0.0.1:8000'


def post(path, body):
    url = BASE + path
    data = json.dumps(body).encode('utf-8')
    req = request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with request.urlopen(req, timeout=10) as resp:
            return resp.getcode(), json.load(resp)
    except Exception as e:
        return None, str(e)


def try_register():
    status, data = post('/auth/register', {"name": "Test User", "email": "test+1@example.com", "password": "TestPass123"})
    print('REGISTER', status)
    print(data)


def try_login():
    status, data = post('/auth/login', {"email": "test+1@example.com", "password": "TestPass123"})
    print('LOGIN', status)
    print(data)


if __name__ == '__main__':
    try_register()
    try_login()
