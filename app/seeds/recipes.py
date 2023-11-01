from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

def seed_recipes():
    recipe1 = Recipe(
        user_id=1,
        title="Spicy Thai Red Curry Chicken",
        recipe_image="https://cook-easy.s3.us-east-2.amazonaws.com/Spicy-Thai-Chicken.jpg",
        description="Spicy Thai Red Curry Chicken is a mouthwatering Asian delight that combines tender chicken pieces with a vibrant, aromatic red curry sauce. Infused with the perfect balance of heat, sweetness, and creaminess from coconut milk, it's a quick and satisfying meal that pairs beautifully with rice or noodles.",
        instructions="Heat the vegetable oil in a large skillet or wok over medium-high heat. Add the red curry paste and minced garlic to the hot oil. Stir-fry for about a minute until fragrant. Add the chicken pieces and cook until they are no longer pink on the outside stirring occasionally. This should take about 5 minutes. Stir in the sliced onions and bell peppers and continue cooking for another 2-3 minutes until they start to soften. Pour in the coconut milk fish sauce (or soy sauce) and brown sugar. Stir everything together and bring the mixture to a simmer. Reduce the heat to low cover the skillet and let the curry simmer for about 10-15 minutes or until the chicken is fully cooked and the vegetables are tender. Remove the skillet from heat and then stir in the lime juice. Taste the curry and adjust the seasoning adding more fish sauce sugar or lime juice as needed. Serve your Spicy Thai Red Curry Chicken over cooked rice or noodles, garnished with fresh basil leaves or cilantro if desired.",
        prep_time=20,
        cook_time=25,
        total_time=45,
        ingredients="1 pound boneless skinless chicken breasts or thighs cut into bite-sized pieces, 2 tablespoons red curry paste (adjust to your preferred level of spiciness), 1 can (13.5 oz) of coconut milk, 1 red bell pepper sliced, 1 green bell pepper sliced, 1 small onion thinly sliced, 1-2 cloves garlic minced, 1 tablespoon vegetable oil, 2 tablespoons fish sauce (or soy sauce for a vegetarian option), 1 tablespoon brown sugar, 1 lime juiced, Fresh basil leaves or cilantro for garnish (optional), Cooked rice or noodles for serving.",
    )
    db.session.add(recipe1)

    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()