from flask import Blueprint, jsonify, request, send_from_directory
from datetime import datetime
import re
import os
import shutil
from models import Post
from app import db

bp = Blueprint('post', __name__, url_prefix='/post')
UPLOAD_FOLDER = os.getcwd() + '/img' # 파일 절대 경로

@bp.route('/load')
def load() :
    Post.query.order_by(Post.postdate.desc()).paginate(page=1, per_page=10)
    return jsonify({'content':'Hello world!'})

@bp.route('/insert', methods=['POST'])
def insert() :
    data = request.get_json().get('content')
    url = re.findall(r'<img src="([^"]+)"', data)
    files = [u.replace('http://localhost:5000/post/load_image?type=temp&amp;name=', '') for u in url]

    if files :
        for file in files :
            shutil.move(f'{UPLOAD_FOLDER}/temp/{file}', f'{UPLOAD_FOLDER}/uploads/{file}')

        for f in os.scandir(UPLOAD_FOLDER + '/temp') :
            os.remove(f.path)

        post = Post(photo=', '.join(files), content=data, postdate=datetime.now())
    else :
        post = Post(content=data, postdate=datetime.now())

    db.session.add(post)
    db.session.commit()

    return jsonify({'rs':1})

@bp.route('/upload', methods=['POST'])
def upload() :
    file = request.files['image']
    file.filename = re.sub('\W', '_', str(datetime.now()).split('.')[0]) + '_' + file.filename
    file.save(os.path.join(UPLOAD_FOLDER + '/temp', file.filename))
    return jsonify({'type':'temp', 'name':file.filename})

@bp.route('/load_image')
def load_image() :
    file_type = request.args.get('type')
    file_name = request.args.get('name')
    return send_from_directory(UPLOAD_FOLDER + '/' + file_type, file_name)

@bp.route('/select')
def select() :
    return jsonify({'rs':0})

@bp.route('/update', methods=['GET', 'POST'])
def update() :
    return jsonify({'rs':0})

@bp.route('/delete', methods=['POST'])
def delete() :
    return jsonify({'rs':0})