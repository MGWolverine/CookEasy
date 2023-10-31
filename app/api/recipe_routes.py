from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Recipe, db
from app.forms.recipe_form import RecipeForm
from .auth_routes import validation_errors_to_error_messages

from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

recipe_routes = Blueprint('recipes', __name__)

#GET ALL RECIPES
@recipe_routes.route('/')
def get_all_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes])