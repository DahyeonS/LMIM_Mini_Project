from flask import Blueprint, jsonify

bp = Blueprint('post', __name__, url_prefix='/post')

@bp.route('/load')
def index() :
    return jsonify({'content':'Hello world!'})