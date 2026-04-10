import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "supersecretkey")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwtsecretkey")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "postgresql://localhost/agx_farm_platform")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
