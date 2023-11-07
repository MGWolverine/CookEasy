from flask import Blueprint, request
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
    return [recipe.to_dict() for recipe in recipes]

#GET A SINGLE RECIPE
@recipe_routes.route('/<int:id>')
def get_single_recipe(id):
    print('BACKEND ID', id)
    recipe = Recipe.query.get(id)
    print('BACKEND RECIPE', recipe)
    if recipe:
        return recipe.to_dict()
    else:
        print('ERROR BACKEND')
        return {'error': 'Recipe not found'}, 404

#CREATE A RECIPE
@recipe_routes.route('/create_recipe', methods=['POST'])
@login_required
def create_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        recipe_image = form.data['recipe_image']
        recipe_image.filename = get_unique_filename(recipe_image.filename)
        upload = upload_file_to_s3(recipe_image)
        print('TEST ', upload)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_recipe = Recipe(
            title = form.data['title'],
            recipe_image = upload['url'],
            description = form.data['description'],
            instructions = form.data['instructions'],
            prep_time = form.data['prep_time'],
            cook_time = form.data['cook_time'],
            total_time = form.data['total_time'],
            ingredients = form.data['ingredients'],
            user_id = form.data['user_id']
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#EDIT RECIPE
@recipe_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_recipe(id):
    form = RecipeForm()

    print('WE NOT IN HERE NOW BOIZ')

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe.query.get(id)

        print('WE IN HERE NOW BOIZ')

        updated_title = form.data['title']
        updated_description = form.data['description']
        updated_instructions = form.data['instructions']
        updated_prep_time = form.data['prep_time']
        updated_cook_time = form.data['cook_time']
        updated_total_time = form.data['total_time']
        updated_ingredients = form.data['ingredients']

        recipe.title = updated_title
        recipe.description = updated_description
        recipe.instructions = updated_instructions
        recipe.prep_time = updated_prep_time
        recipe.cook_time = updated_cook_time
        recipe.total_time = updated_total_time
        recipe.ingredients = updated_ingredients
        db.session.commit()
        return recipe.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE RECIPE
@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    file_to_delete = remove_file_from_s3(recipe.recipe_image)

    if file_to_delete:
        db.session.delete(recipe)
        db.session.commit()
        return "Recipe successfully deleted."
    else:
        return {'error': 'Song does not exist'}, 404