import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MAIL_SERVER = 'smtp.naver.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USE_SSL = False

load_dotenv(os.path.join(BASE_DIR, '.env'))
MAIL_USERNAME = os.getenv('MAIL_USERNAME')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
MAIL_RECEIVER = os.getenv('MAIL_RECEIVER')

MAIL_DEFAULT_SENDER = (os.getenv('MAIL_SENDER'), MAIL_USERNAME)