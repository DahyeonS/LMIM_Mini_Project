from flask import Blueprint, jsonify
from flask_wtf.csrf import generate_csrf

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/')
def index() :
    return 'Hello world!'

@bp.route('/csrf_token')
def csrf_token() :
    token = generate_csrf()
    return jsonify({'csrf_token':token})