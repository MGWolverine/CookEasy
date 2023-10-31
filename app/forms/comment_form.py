from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class CommentForm(FlaskForm):
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    comment_text = StringField('comment_text', validators=[DataRequired("This field is required.")])