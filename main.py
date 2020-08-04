from flask import Flask, request, flash, session, redirect
from flask import render_template
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime

with open('config.json', 'r') as file:
    params = json.load(file)['params']

local_server = params['local_server']
app = Flask(__name__)

if local_server == True:
    app.config['SQLALCHEMY_DATABASE_URI'] = params['local_uri']
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = params['prod_uri']
db = SQLAlchemy(app)

app.secret_key = b'ansduh5ahdki]\-'

class Contacts(db.Model):
    """
    name, email, subject, mes
    """
    __tablename__ = 'contacts'
    sno = db.Column('sno', db.Integer, nullable=False, primary_key=True)
    name = db.Column('name', db.String, nullable=False)
    email = db.Column('email', db.String, nullable=False)
    subject = db.Column('subject', db.String, nullable=False)
    mes = db.Column('mes', db.String, nullable=False)


class Posts(db.Model):
    """
    sno, slug, title, content, date
    """
    __tablename__ = 'posts'
    sno = db.Column('sno', db.Integer, nullable=False, primary_key=True)
    slug = db.Column('slug', db.String, nullable=False)
    title = db.Column('title', db.String, nullable=False)
    content = db.Column('content', db.String, nullable=False)
    date = db.Column('date', db.String, nullable=False)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/portfolio.html')
def portfolio():
    return render_template('portfolio.html')

@app.route('/about.html', methods=["GET","POST"])
def about():
    if (request.method=='POST'):
        '''Add entry to database'''
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        mesg = request.form.get('message')
        """
        name, email, subject, mes
        """
        entries = Contacts(name=name, email=email, subject=subject, mes=mesg)

        db.session.add(entries)
        db.session.commit()

    return render_template('about.html')


@app.route('/blog.html', methods=['GET'])
def blog():
    posts = Posts.query.filter_by().all()

    return render_template('blog.html', posts=posts)


@app.route('/blog.html/<string:post_slug>', methods=['GET'])
def post_route(post_slug):
    post = Posts.query.filter_by(slug=post_slug).first()

    page = post_slug +".html"
    return render_template(page, post=post)


@app.route('/dashboard', methods=['GET', 'POST'])
def login():
    if 'user' in session and session['user'] == params['admin_user']:
        posts = Posts.query.all()
        return render_template('admin.html', posts=posts)

    if request.method == 'POST':
        # admin panel
        username = request.form.get('uname')
        user_pass = request.form.get('password')

        if username == params['admin_user'] and user_pass == params['admin_pass']:
            session['user'] = username #user logged in
            posts = Posts.query.all()
            return render_template('admin.html', posts=posts)

    return render_template('login.html')


@app.route('/edit/<string:sno>', methods=['GET', 'POST'])
def edit(sno):
    if 'user' in session and session['user'] == params['admin_user']:
        if request.method == 'POST':
            req_title = request.form.get('title')
            req_slug = request.form.get('slug')
            req_content = request.form.get('content')
            curr_dtime = datetime.now()

            if sno == '0':
                post = Posts(slug=req_slug, title=req_title, content=req_content, date=curr_dtime)
                db.session.add(post)
                db.session.commit()

            else:
                post = Posts.query.filter_by(sno=sno).first()
                post.title = req_title
                post.slug = req_slug
                post.content = req_content
                post.date = curr_dtime
                db.session.commit()

                return redirect('/edit/'+sno)
        post = Posts.query.filter_by(sno=sno).first()
        return render_template('edit.html', post=post, sno=sno)


@app.route('/logout')
def logout():
    session.pop('user')

    return redirect('/dashboard')


@app.route('/delete/<string:sno>', methods=['GET', 'POST'])
def delete(sno):
    if 'user' in session and session['user'] == params['admin_user']:
        post = Posts.query.filter_by(sno=sno).first()
        db.session.delete(post)
        db.session.commit()

    return redirect('/dashboard')


app.run(debug=True)