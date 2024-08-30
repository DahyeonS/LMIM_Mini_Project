from config.default import *
from logging.config import dictConfig
from base64 import b64decode

user = os.getenv('DB_USER') # 사용자 이름
pw = os.getenv('DB_PASSWORD') # 암호
url = os.getenv('DB_HOST') # 데이터베이스 주소
db = os.getenv('DB_NAME') # 데이터베이스 이름

SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{user}:{pw}@{url}/{db}'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = b64decode(os.getenv('SECRET_KEY')) # 시크릿 키
JWT_SECRET_KEY = b64decode(os.getenv('JWT_SECRET_KEY')) # JWT 시크릿 키
CORS_RESOURCES = {r'/*': {'origins': ''}} # CORS 허용 주소

dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/calendar.log'),
            'maxBytes': 1024 * 1024 * 5,  # 5 MB
            'backupCount': 5,
            'formatter': 'default',
        },
    },
    'root': {
        'level': 'INFO',
        'handlers': ['file']
    }
})