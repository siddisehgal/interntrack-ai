from app.services.auth import hash_password

pw = 'TestPass123'
print('pw repr:', repr(pw), 'len', len(pw), 'type', type(pw))
print('hashed:', hash_password(pw))
