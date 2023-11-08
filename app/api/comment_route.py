from flask import Blueprint, request
from flask_login import login_required
from app.models import Comment, db
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

#GET ALL COMMENTS
@comment_routes.route('/')
def get_all_comments():
    comments = Comment.query.all()
    return [comment.to_dict() for comment in comments]

#CREATE A COMMENT
@comment_routes.route('/create_comment', methods=['POST'])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:

        new_comment = Comment(
            recipe_id = form.data['recipe_id'],
            user_id = form.data['user_id'],
            rating = form.data['rating'],
            comment = form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#EDIT COMMENT
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)

        updated_rating = form.data['rating']
        updated_comment = form.data['comment']

        comment.rating = updated_rating
        comment.comment = updated_comment
        db.session.commit()
        return comment.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE COMMENT
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    if comment:
        db.session.delete(comment)
        db.session.commit()
        return "Comment successfully deleted."
    else:
        return {'error': 'Comment does not exist'}, 404