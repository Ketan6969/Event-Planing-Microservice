import bcrypt

def hash_pass(password):
    salt = bcrypt.gensalt()
    password_bytes = password.encode('utf-8')
    hashed_pass = bcrypt.hashpw(password_bytes,salt=salt)
    return hashed_pass

def check_hash(password, hash):
    password_bytes = password.encode('utf-8')
    hash_bytes = hash.encode('utf-8')
    if bcrypt.checkpw(password_bytes,hash_bytes):
        return True
    else:
        return [{'Response' : 'Wrong Password'}]
    