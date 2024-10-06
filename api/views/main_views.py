from flask import Blueprint, jsonify, request, current_app 
from flask import render_template, send_from_directory, send_file
from flask_wtf.csrf import generate_csrf
from flask_mail import Message
import os
from app import mail

bp = Blueprint('main', __name__, url_prefix='/')
UPLOAD_FOLDER = os.getcwd() + '/img' # 파일 절대 경로

@bp.route('/')
def index() :
    return 'Hello world!'

@bp.route('/csrf_token')
def csrf_token() :
    token = generate_csrf()
    return jsonify({'csrf_token':token})

@bp.route('/load_image')
def load_image() :
    file_type = request.args.get('type')
    file_name = request.args.get('name')

    if file_type == 'static' :
        path = os.path.abspath(os.path.join(os.getcwd(), os.pardir))
        return send_file(os.path.join(f'{path}/static', file_name), as_attachment=True)

    return send_from_directory(f'{UPLOAD_FOLDER}/{file_type}', file_name)

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