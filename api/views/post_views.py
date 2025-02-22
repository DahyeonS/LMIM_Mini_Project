from flask import Blueprint, jsonify, request
from datetime import datetime
import re; import os; import shutil
from bs4 import BeautifulSoup

from models import Post
from app import db

bp = Blueprint('post', __name__, url_prefix='/post')
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'img') # 파일 절대 경로

def html_parse(html_text):
    soup = BeautifulSoup(html_text, 'html.parser')
    return soup.get_text(separator='\n')

@bp.route('/load')
def load():
    page = request.args.get('page', type=int, default=1)
    search_tag = request.args.get('tag')

    if search_tag:
        posts = Post.query.filter(Post.tag.contains(search_tag)).order_by(Post.postdate.desc()).paginate(page=page, per_page=5)
    else:
        posts = Post.query.order_by(Post.postdate.desc()).paginate(page=page, per_page=5)
        
    tags = list(set(tag for post in Post.query.all() if post.tag for tag in post.tag.split(' ')))
    data = [
        {
            'idx':p.idx,
            'title':p.title,
            'content':html_parse(p.content),
            'tag':p.tag,
            'photo':p.photo,
            'postdate':p.postdate.strftime('%Y.%m.%d %I:%M %p'),
            'modified_date':p.modified_date.strftime('%Y.%m.%d %I:%M %p') if p.modified_date else p.modified_date
        } for p in posts
    ]

    result = {
        'tags':tags,
        'items':data,
        'hasPrev':posts.has_prev,
        'hasNext':posts.has_next,
        'page':page,
        'iterPages':list(posts.iter_pages()),
        'prevNum':posts.prev_num,
        'nextNum':posts.next_num
    }

    return jsonify(result)

@bp.route('/insert', methods=['POST'])
def insert():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    tag = data.get('tag')

    url = re.findall(r'<img src="([^"]+)"', content)
    files = [u.replace('./load_image?type=temp&amp;name=', '') for u in url]

    if files:
        for file in files:
            shutil.move(f'{UPLOAD_FOLDER}/temp/{file}', f'{UPLOAD_FOLDER}/uploads/{file}')

        for f in os.scandir(UPLOAD_FOLDER + '/temp'):
            os.remove(f.path)

        content = content.replace('<img src="./load_image?type=temp', '<img src="./load_image?type=uploads')

        if tag:
            post = Post(title=title, content=content, tag=' '.join(tag), photo=', '.join(files))
        else:
            post = Post(title=title, content=content, photo=', '.join(files))
    else:
        if tag:
            post = Post(title=title, content=content, tag=' '.join(tag))
        else:
            post = Post(title=title, content=content)

    db.session.add(post)
    db.session.commit()

    return jsonify({'rs':1, 'idx':post.idx})

@bp.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    file.filename = re.sub('\W', '_', str(datetime.now())[:22]) + '_' + file.filename
    file.save(os.path.join(f'{UPLOAD_FOLDER}/temp', file.filename))
    return jsonify({'name':file.filename})

@bp.route('/select')
def select():
    idx = request.args.get('idx', type=int)
    result = Post.query.get(idx)

    if result:
        return jsonify({
            'rs':1,
            'title':result.title,
            'content':result.content,
            'tag':result.tag,
            'photo':result.photo,
            'postdate':result.postdate.strftime('%Y년 %m월 %d일 %I:%M %p'),
            'modified_date':result.modified_date.strftime('%Y년 %m월 %d일 %I:%M %p') if result.modified_date else result.modified_date
        })
    
    return jsonify({'rs':0})

@bp.route('/update', methods=['GET', 'POST'])
def update():
    if request.method == 'POST':
        data = request.get_json()
        idx = data.get('idx')
        title = data.get('title')
        content = data.get('content')
        tag = data.get('tag')

        url = re.findall(r'<img src="([^"]+)"', content)
        new_files = [
            u.replace('./load_image?type=temp&amp;name=', '') for u in url
            if './load_image?type=uploads&amp;name=' not in u
        ]
        files = [
            u.replace('./load_image?type=uploads&amp;name=', '') for u in url
            if './load_image?type=temp&amp;name=' not in u
        ]

        prev_photo = Post.query.get(idx).photo

        if prev_photo and files:
            if prev_photo.split(', ') != files:
                for p in prev_photo.split(', '):
                    if p not in files:
                        os.remove(f'{UPLOAD_FOLDER}/uploads/{p}')

        elif prev_photo:
            for p in prev_photo.split(', ') :
                os.remove(f'{UPLOAD_FOLDER}/uploads/{p}')

        if new_files:
            for file in new_files:
                shutil.move(f'{UPLOAD_FOLDER}/temp/{file}', f'{UPLOAD_FOLDER}/uploads/{file}')
            
            for f in os.scandir(UPLOAD_FOLDER + '/temp'):
                os.remove(f.path)

        if files or new_files:
            content = content.replace('<img src="./load_image?type=temp', '<img src="./load_image?type=uploads')
            new_url = re.findall(r'<img src="([^"]+)"', content)
            photos = [n.replace('./load_image?type=uploads&amp;name=', '') for n in new_url]
            
            if tag:
                p_update = {'title':title, 'content':content, 'tag':' '.join(tag), 'photo':', '.join(photos)}
            else:
                p_update = {'title':title, 'content':content, 'photo':', '.join(photos)}
        
        else:
            if tag:
                p_update = {'title':title, 'content':content, 'tag':' '.join(tag), 'photo':None}
            else:
                p_update = {'title':title, 'content':content, 'photo':None}

        db.session.query(Post).filter(Post.idx==idx).update(p_update)
        db.session.commit()

        return jsonify({'rs':1})

    idx = request.args.get('idx', type=int)
    post = Post.query.get(idx)
    return jsonify({'title':post.title, 'content':post.content, 'tag':post.tag})

@bp.route('/delete', methods=['POST'])
def delete():
    idx = request.get_json().get('idx')
    post = Post.query.get(idx)

    if post.photo:
        for file in post.photo.split(', '):
            os.remove(f'{UPLOAD_FOLDER}/uploads/{file}')

    db.session.delete(post)
    db.session.commit()

    return jsonify({'rs':1})