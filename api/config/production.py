from config.default import *
from base64 import b64decode

user = os.getenv('DB_USER') # 사용자 이름
pw = os.getenv('DB_PASSWORD') # 암호
url = os.getenv('DB_HOST') # 데이터베이스 주소
db = os.getenv('DB_NAME') # 데이터베이스 이름

DEBUG = False
SQLALCHEMY_DATABASE_URI = f"mysql+mysqldb://{user}:{pw}@{url}/{db}?charset=utf8"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ENGINE_OPTIONS = {'pool_recycle' : 280}
SECRET_KEY = b64decode(os.getenv('SECRET_KEY')) # 시크릿 키
JWT_SECRET_KEY = b64decode(os.getenv('JWT_SECRET_KEY')) # JWT 시크릿 키
CORS_RESOURCES = {r'/*': {'origins': 'https://dahyeonseo.pythonanywhere.com/'}} # CORS 허용 주소