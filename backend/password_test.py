from passlib.context import CryptContext

ctx = CryptContext(schemes=["pbkdf2_sha256", "bcrypt"], deprecated="auto")
print('schemes', ctx.schemes())
print('hashing...')
try:
    h = ctx.hash('TestPass123')
    print('hash ok', h)
    print('verify', ctx.verify('TestPass123', h))
except Exception as e:
    print('ERROR', type(e).__name__, e)
