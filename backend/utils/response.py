def success(message, data=None):
    return {"success": True, "message": message, "data": data or {}}, 200

def error(message, code=400):
    return {"success": False, "message": message, "data": {}}, code
