from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message="This field is required")])
    recipe_image = FileField('recipe_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField('description', validators=[DataRequired(message="This field is required")])
    instructions = StringField('instructions', validators=[DataRequired(message="This field is required")])
    prep_time = FloatField('prep_time', validators=[DataRequired(message="This field is required")])
    cook_time = FloatField('cook_time', validators=[DataRequired(message="This field is required")])
    total_time = FloatField('total_time', validators=[DataRequired(message="This field is required")])
    ingredients = StringField('ingredients', validators=[DataRequired(message="This field is required")])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    submit = SubmitField("Create Recipe")