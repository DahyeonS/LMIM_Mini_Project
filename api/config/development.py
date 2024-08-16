from config.default import *

db_path = os.path.join(BASE_DIR, 'introduction.db')
SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = "dev"