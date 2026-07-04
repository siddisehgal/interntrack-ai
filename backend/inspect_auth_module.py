import inspect
import app.services.auth as auth
import app.services.password as password

print('auth module file:', auth.__file__)
print('password module file:', password.__file__)
print('auth source lines:')
for i, line in enumerate(inspect.getsource(auth).splitlines(), start=1):
    print(f'{i}: {line}')
print('\npassword source lines:')
for i, line in enumerate(inspect.getsource(password).splitlines(), start=1):
    print(f'{i}: {line}')
print('\nverify_password object:', auth.verify_password)
print('hash_password object:', auth.hash_password)
