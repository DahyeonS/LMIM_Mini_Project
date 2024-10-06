from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from sqlalchemy import MetaData

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

db = SQLAlchemy(metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate()
csrf = CSRFProtect()
jwt = JWTManager()
mail = Mail()

def create_app() :
    # app = Flask(__name__) # 개발
    app = Flask(__name__, static_folder='../build') # 배포
    app.config.from_envvar('APP_CONFIG_FILE') # 설정 불러오기

    # CSRF 설정
    csrf.init_app(app)

    # JWT 설정
    jwt.init_app(app)

    # CORS 설정
    CORS(app, resources=app.config.get('CORS_RESOURCES', {r'/*': {'origins': '*'}}))

    # 메일 설정
    mail.init_app(app)

    # ORM
    db.init_app(app)
    if app.config['SQLALCHEMY_DATABASE_URI'].startswith("sqlite"):
        migrate.init_app(app, db, render_as_batch=True)
    else:
        migrate.init_app(app, db)
    import models

    # Route
    from views import main_views, auth_views, post_views, memo_views
    app.register_blueprint(main_views.bp)
    app.register_blueprint(auth_views.bp)
    app.register_blueprint(post_views.bp)
    app.register_blueprint(memo_views.bp)

    return app