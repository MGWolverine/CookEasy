import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { useHistory, Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes.allRecipes);
  const history = useHistory();

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, [dispatch]);

  const allRecipe = Object.values(allRecipes)[0];

  return (
    <div className="homepage-container">
      <div
        className="main-recipe-item"
        onClick={() => {
          history.push(`/recipes/${allRecipe?.id}`);
        }}
        key={allRecipe?.id}
      >
        <img
          className="main-recipe-image"
          src={allRecipe?.recipe_image}
          alt={allRecipe?.title}
        />
        <div className="main-recipe-info">
          <h2 className="main-recipe-title">{allRecipe?.title}</h2>
          <p className="main-recipe-description">{allRecipe?.description}</p>
        </div>
      </div>
      <div>
        <h1 className="recipe-title">Latest Recipes</h1>
      </div>
      <div className="recipes-flexed">
        {Object.values(allRecipes).length > 0 &&
          Object.values(allRecipes).map((recipe) => (
            <div
              className="recipe-item"
              onClick={() => {
                history.push(`/recipes/${recipe.id}`);
              }}
              key={recipe.id}
            >
              <img src={recipe.recipe_image} alt={recipe.title} />
              <div>
                <h2 className="flex-recipe-title">{recipe.title}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
