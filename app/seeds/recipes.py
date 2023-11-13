from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

def seed_recipes():
    recipe1 = Recipe(
        user_id=2,
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
        user_id=2,
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

    recipe3 = Recipe(
        user_id=2,
        title="Oreo Cheesecake",
        recipe_image="https://cook-easy.s3.us-east-2.amazonaws.com/cheesecake.jpg",
        description="Oreo Cheesecake is a delightful dessert that combines the rich and creamy texture of traditional cheesecake with the iconic flavor of Oreo cookies. The crust is made from crushed Oreo cookies, creating a chocolaty and crunchy base that complements the smooth and velvety cheesecake filling. The cheesecake is often garnished with additional Oreo pieces, whipped cream, or chocolate drizzle for added decadence.",
        instructions="Preheat your oven to 325°F (163°C). In a bowl, combine the crushed Oreo cookies and melted butter. Press the mixture into the bottom of a greased springform pan, creating an even crust. Place the pan in the refrigerator to set while you prepare the filling. In a large mixing bowl, beat the softened cream cheese until smooth. Add the granulated sugar and vanilla extract, and continue to beat until well combined. Pour the cheesecake filling over the prepared crust in the springform pan. Bake in the preheated oven for about 50-60 minutes or until the center is set and the edges are slightly golden.",
        prep_time=25,
        cook_time=55,
        total_time=80,
        ingredients="2 cups crushed Oreo cookies . 1/4 cup unsalted butter, melted. 24 ounces (about 680g) cream cheese, softened. 1 teaspoon vanilla extract. 3 large eggs. 1 cup crushed Oreo cookies (optional, for added texture). 1 cup granulated sugar",
    )
    db.session.add(recipe3)

    recipe4 = Recipe(
        user_id=2,
        title="Hummus",
        recipe_image="https://cook-easy.s3.us-east-2.amazonaws.com/hummus.jpg",
        description="Hummus is a classic Middle Eastern dip or spread known for its creamy and smooth texture, combined with a savory and slightly tangy taste. Made primarily from cooked and mashed chickpeas, blended with tahini (sesame seed paste), garlic, lemon juice, and olive oil, hummus is a versatile dish enjoyed as a dip for pita bread, vegetables, or chips. It can also be used as a spread in sandwiches or wraps. Hummus is not only delicious but also a nutritious snack, as chickpeas are a good source of protein and fiber.",
        instructions="If using canned chickpeas, drain and rinse them. If using dried chickpeas, cook and cool them according to package instructions. In a food processor, combine chickpeas, lemon juice, tahini, minced garlic, olive oil, cumin, and a pinch of salt. With the food processor running, add 2 to 3 tablespoons of water gradually until the hummus reaches your desired smoothness and consistency.Taste the hummus and adjust the seasoning, adding more salt or lemon juice if needed. Transfer the hummus to a serving bowl, drizzle with olive oil",
        prep_time=10,
        cook_time=0,
        total_time=10,
        ingredients="1 can (15 ounces) chickpeas (garbanzo beans). 1/4 cup fresh lemon juice. 1/4 cup well-stirred tahini. 1 small garlic clove, minced. 2 tablespoons extra-virgin olive oil. 1/2 teaspoon ground cumin. Salt, to taste.",
    )
    db.session.add(recipe4)

    recipe5 = Recipe(
        user_id=2,
        title="ShakShuka",
        recipe_image="https://cook-easy.s3.us-east-2.amazonaws.com/shakshuka.jpg",
        description="Shakshuka is a flavorful and hearty North African and Middle Eastern dish featuring poached eggs in a rich and spicy tomato and pepper sauce. Often seasoned with a blend of aromatic spices, shakshuka is traditionally cooked and served in a cast-iron skillet or a similar pan. The dish is known for its vibrant colors, bold flavors, and the comforting combination of runny egg yolks with the savory tomato sauce. It's commonly enjoyed for breakfast or brunch but can also be served as a satisfying dinner.",
        instructions="Heat olive oil in a large skillet or pan over medium heat. Add chopped onions and red bell peppers, sautéing until softened, about 5 minutes. Add minced garlic, ground cumin, smoked paprika, ground coriander, and chili powder. Stir to combine and cook for an additional 1-2 minutes until fragrant. Make small wells in the sauce using a spoon and crack the eggs into these wells. Season the eggs with salt and pepper. Make small wells in the sauce using a spoon and crack the eggs into these wells. Season the eggs with salt and pepper. Garnish the shakshuka with chopped fresh parsley or cilantro. Optionally, sprinkle crumbled feta cheese over the top",
        prep_time=5,
        cook_time=20,
        total_time=25,
        ingredients="2 tablespoons olive oil. 1 onion, finely chopped. 1 red bell pepper, chopped. 2 cloves garlic, minced. 1 teaspoon ground cumin. 1 teaspoon smoked paprika. 1/2 teaspoon ground coriander. 1/2 teaspoon chili powder. 1 can (28 ounces) crushed tomatoes. 4-6 large eggs",
    )
    db.session.add(recipe5)

    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()