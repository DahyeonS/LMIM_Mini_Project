from flask import Blueprint
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/')
def index() :
    return 'Hello world!'