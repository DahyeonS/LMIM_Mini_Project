from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from models import Memo
from app import db

bp = Blueprint('memo', __name__, url_prefix='/memo')

@bp.route('/load')
def load():
    page = request.args.get('page', type=int, default=1)
    memos = Memo.query.order_by(Memo.postdate.desc()).paginate(page=page, per_page=10)

    data = [
        {
            'num':idx + 1,
            'idx':m.idx,
            'username':m.username,
            'content':m.content,
            'postdate':m.postdate.strftime('%Y.%m.%d %I:%M %p')
        } for idx, m in enumerate(memos)
    ]

    result = {
        'items':data,
        'hasPrev':memos.has_prev,
        'hasNext':memos.has_next,
        'page':page,
        'iterPages':list(memos.iter_pages()),
        'prevNum':memos.prev_num,
        'nextNum':memos.next_num
    }

    return jsonify(result)

@bp.route('/insert', methods=['POST'])
def insert():
    data = request.get_json()
    memo = Memo(
        username=data.get('username'),
        pw=generate_password_hash(data.get('password')),
        content=data.get('content')
    )
    
    db.session.add(memo)
    db.session.commit()

    return jsonify({'rs':1})

@bp.route('/delete', methods=['POST'])
def delete():
    data = request.get_json()
    idx = data.get('idx')
    pw = data.get('password')
    memo = Memo.query.get(idx)

    if check_password_hash(memo.pw, pw):
        db.session.delete(memo)
        db.session.commit()
        return jsonify({'rs':1})
    
    return jsonify({'rs':0})

@bp.route('/delete_admin', methods=['POST'])
def delete_admin():
    data = request.get_json()
    idx = data.get('idx')
    memo = Memo.query.get(idx)

    if memo:
        db.session.delete(Memo.query.get(idx))
        db.session.commit()

        return jsonify({'rs':1})
    
    return jsonify({'rs':0})