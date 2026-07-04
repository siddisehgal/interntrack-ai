import importlib
import sys
print('python', sys.executable)
for name in ['bcrypt', 'passlib', 'passlib.hash', 'passlib.handlers.bcrypt']:
    try:
        module = importlib.import_module(name)
        print('\nMODULE', name)
        print('file', getattr(module, '__file__', None))
        print('attrs', [a for a in dir(module) if a.startswith('__')][:10])
        if name == 'bcrypt':
            print('bcrypt __about__:', getattr(module, '__about__', None))
    except Exception as e:
        print('\nFAILED', name, e)

try:
    import app.services.password as pw
    print('\napp.services.password scheme', pw.pwd_context.schemes)
    print('hash test', pw.hash_password('TestPass123'))
except Exception as e:
    print('\nFAILED app.services.password', e)

try:
    import app.services.auth as auth
    print('\napp.services.auth path', auth.__file__)
    if hasattr(auth, 'verify_password'):
        print('auth verify_password from', auth.verify_password)
    else:
        print('auth verify_password not present')
except Exception as e:
    print('\nFAILED app.services.auth', e)
