from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

def seed_recipes():
    recipe1 = Recipe(
        user_id=1,
        title="Spicy Thai Red Curry Chicken",
        recipe_image="https://cook-easy.s3.us-east-2.amazonaws.com/Spicy-Thai-Chicken.jpg",
        description="Spicy Thai Red Curry Chicken is a mouthwatering Asian delight that combines tender chicken pieces with a vibrant, aromatic red curry sauce. Infused with the perfect balance of heat, sweetness, and creaminess from coconut milk, it's a quick and satisfying meal that pairs beautifully with rice or noodles.",
        instructions="Heat the vegetable oil in a large skillet or wok over medium-high heat. Add the red curry paste and minced garlic to the hot oil. Stir-fry for about a minute until fragrant. Add the chicken pieces and cook until they are no longer pink on the outside stirring occasionally. This should take about 5 minutes. Stir in the sliced onions and bell peppers and continue cooking for another 2-3 minutes until they start to soften. Pour in the coconut milk fish sauce (or soy sauce) and brown sugar. Stir everything together and bring the mixture to a simmer. Reduce the heat to low cover the skillet and let the curry simmer for about 10-15 minutes or until the chicken is fully cooked and the vegetables are tender. Remove the skillet from heat and then stir in the lime juice. Taste the curry and adjust the seasoning adding more fish sauce sugar or lime juice as needed. Serve your Spicy Thai Red Curry Chicken over cooked rice or noodles, garnished with fresh basil leaves or cilantro if desired",
        prep_time=20,
        cook_time=25,
        total_time=45,
        ingredients="2 pound chicken breast. 20 grams garlic. 50 grams red curry paste. 2 tablespoons vegetable oil. 1 white onion. 1 red pepper. 1 can of Coconut Milk. 1 tablespoon fish sauce. 1 tablespoon brown sugar. 1 lime. rice or noodles",
    )
    db.session.add(recipe1)

    recipe2 = Recipe(
        user_id=1,
        title="PB&J Sandwich",
        recipe_image="https://cook-easy.s3.us-east-2.amazonaws.com/peanut-butter-jelly.jpg",
        description="A Peanut Butter and Jelly (PB&J) sandwich is a timeless classic, cherished for its delightful combination of flavors and textures. This straightforward recipe yields a delightful, sweet, and nutty sandwich that's loved by all ages. With just a few basic ingredients and minimal effort, you can create a satisfying PB&J sandwich that's perfect for breakfast, lunch, or a quick snack.",
        instructions="Begin by laying out the two slices of bread on a clean surface. Using a knife or a spoon, spread a generous layer of creamy or crunchy peanut butter on one of the bread slices. On the second bread slice, generously spread your chosen fruity jelly or jam. Gently place the two bread slices together, with the peanut butter and jelly sides facing each other",
        prep_time=5,
        cook_time=0,
        total_time=5,
        ingredients="2 slices of bread. Peanut butter. Jelly",
    )
    db.session.add(recipe2)

    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()