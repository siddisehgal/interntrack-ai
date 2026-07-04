import os
import fnmatch

root = os.path.abspath(os.path.dirname(__file__))
for dirpath, dirnames, filenames in os.walk(root):
    for filename in filenames:
        if filename.endswith('.py'):
            path = os.path.join(dirpath, filename)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    text = f.read()
            except Exception as exc:
                print('SKIP', path, exc)
                continue
            if 'pwd_context' in text or 'passlib' in text or 'bcrypt' in text or 'verify_password(' in text:
                print('MATCH', path)
                for i, line in enumerate(text.splitlines(), start=1):
                    if 'pwd_context' in line or 'passlib' in line or 'bcrypt' in line or 'verify_password(' in line:
                        print(f'{i}: {line.strip()}')
                print()
