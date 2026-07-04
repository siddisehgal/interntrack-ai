import base64
import hashlib
import secrets

import bcrypt

ALGORITHM = "sha256"
DEFAULT_ITERATIONS = 29000
SALT_BYTES = 16


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(SALT_BYTES)
    dk = hashlib.pbkdf2_hmac(ALGORITHM, password.encode("utf-8"), salt, DEFAULT_ITERATIONS)
    salt_b64 = base64.urlsafe_b64encode(salt).decode("ascii")
    hash_b64 = base64.urlsafe_b64encode(dk).decode("ascii")
    return f"pbkdf2_sha256${DEFAULT_ITERATIONS}${salt_b64}${hash_b64}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if hashed_password.startswith("$2"):
        try:
            return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
        except Exception:
            return False

    try:
        algo, iterations, salt_b64, hash_b64 = hashed_password.split("$")
    except ValueError:
        return False

    if algo != "pbkdf2_sha256":
        return False

    try:
        iterations = int(iterations)
        salt = base64.urlsafe_b64decode(salt_b64.encode("ascii"))
        expected = hashlib.pbkdf2_hmac(ALGORITHM, plain_password.encode("utf-8"), salt, iterations)
        actual = base64.urlsafe_b64decode(hash_b64.encode("ascii"))
        return secrets.compare_digest(expected, actual)
    except Exception:
        return False
