# from app.models import db, Ingredient, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_ingredients(recipe_id):
#     ingredients = ["Bread", "Peanut Butter", "Jelly"]
#     is_vegan_list = [True, True, True]

#     ingredient_list = []

#     for i in range(0 , len(ingredients)):
#         ingredient = Ingredient(
#            recipe_id=recipe_id,
#            name=ingredients[i],
#            isVegan=is_vegan_list[i]
#         )
#         ingredient_list.append(ingredient)

#     db.session.add_all(ingredient_list)

#     db.session.commit()

# def undo_ingredients():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM ingredients"))

#     db.session.commit()