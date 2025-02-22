from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import Member
from app import db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/load')
def load():
    return jsonify({'rs':len(Member.query.all())})

@bp.route('/insert', methods=['POST'])
def create():
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
def login():
    data = request.get_json()
    user = Member.query.get(1)

    if user.id == data.get('id') and check_password_hash(user.pw, data.get('pw')):
        access_token = create_access_token(identity=user.id)

        return jsonify({'rs':1, 'access_token':access_token})

    return jsonify({'rs':0})

@bp.route('/check', methods=['POST'])
def check():
    data = request.get_json()
    user = Member.query.get(1)

    if check_password_hash(user.pw, data.get('password')):
        return jsonify({'rs':1})
    
    return jsonify({'rs':0})

@bp.route('/update', methods=['GET', 'POST'])
def update():
    if request.method == 'POST':
        data = request.get_json()

        if data.get('pw'):
            a_update = {'id':data.get('id'), 'pw':generate_password_hash(data.get('pw')), 'email':data.get('email')}
        else:
            a_update = {'id':data.get('id'), 'email':data.get('email')}

        db.session.query(Member).filter(Member.idx==1).update(a_update)
        db.session.commit()

        return jsonify({'rs':1})
    
    user = Member.query.get(1)
    return jsonify({'id':user.id, 'email':user.email})