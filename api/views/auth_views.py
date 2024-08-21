from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Member
from app import db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/load')
def load() :
    return jsonify({'rs':len(Member.query.all())})

@bp.route('/insert', methods=['POST'])
def create() :
    data = request.get_json()
    user = Member(
        id=data.get('id'),
        pw=generate_password_hash(data.get('pw')),
        email=data.get('email')
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({'rs':1})

@bp.route('/login', methods=['POST'])
def login() :
    data = request.get_json()
    user = Member.query.get(1)

    if user.id == data.get('id') and check_password_hash(user.pw, data.get('pw')) :
        access_token = create_access_token(identity=user.id)

        return jsonify({'rs':1, 'access_token':access_token})

    return jsonify({'rs':0})

@bp.route('/update', methods=['POST'])
def update() :
    data = request.get_json()
    update = {'id':data.get('id'), 'pw':generate_password_hash(data.get('pw')), 'email':data.get('email')}

    db.session.query(Member).filter(Member.idx==1).update(update)
    db.session.commit()

    return jsonify({'rs':1})