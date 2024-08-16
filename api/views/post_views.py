from flask import Blueprint, jsonify
import json

bp = Blueprint('post', __name__, url_prefix='/post')

@bp.route('/load')
def index() :
    return jsonify({'content':'Hello world!'})