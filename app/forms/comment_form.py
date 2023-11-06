from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    comment_text = StringField('comment_text', validators=[DataRequired("This field is required.")])
    submit = SubmitField("Create Comment")