from app import db

class Member(db.Model) :
    idx = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.String(20), nullable=False)
    pw = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Post(db.Model) :
    idx = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    photo = db.Column(db.String(500))
    content = db.Column(db.String(2000), nullable=False)
    postdate = db.Column(db.DateTime(), nullable=False)

class Memo(db.Model) :
    idx = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    pw = db.Column(db.String(150), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    postdate = db.Column(db.DateTime(), nullable=False)