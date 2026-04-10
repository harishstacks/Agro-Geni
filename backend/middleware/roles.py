from flask_jwt_extended import get_jwt_identity
from functools import wraps
from flask import jsonify

def role_required(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            identity = get_jwt_identity()
            if not identity or identity.get('role') != role:
                return jsonify({"success": False, "message": "Unauthorized", "data": {}}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
