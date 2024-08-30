from flask import Blueprint, jsonify, request, current_app, render_template
from flask_wtf.csrf import generate_csrf
from flask_mail import Message
from app import mail

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/')
def index() :
    return 'Hello world!'

@bp.route('/csrf_token')
def csrf_token() :
    token = generate_csrf()
    return jsonify({'csrf_token':token})

@bp.route('/contact', methods=['POST'])
def contact() :
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    content = data.get('content')

    msg = Message(
        f'{name}님께서 보낸 메시지입니다.', recipients=[current_app.config['MAIL_RECEIVER']],
        html=render_template('email_template.html', name=name, email=email, phone=phone, content=content)
        )
    
    mail.send(msg)

    return jsonify({'rs':1})