from config.default import *

db_path = os.path.join(BASE_DIR, 'introduction.db')
SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = 'dev'
JWT_SECRET_KEY = 'jwt_dev'
CORS_RESOURCE = {r'/*': {'origins': 'http://localhost:3000'}} # CORS 허용 주소