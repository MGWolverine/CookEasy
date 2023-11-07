import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getRecipesThunk()).then((data) => {
      setRecipes(data);
    });
  }, [dispatch]);

  if (!recipes) {
    return null;
  }

  const splitList = (text) => {
    const parts = text.split("*");
    const filteredParts = parts.filter((part) => part.trim() !== "");

    return (
      <ul>
        {filteredParts.map((part, index) => (
          <li key={index}>{part}</li>
        ))}
      </ul>
    );
  };

  const splitAndNumberedList = (text) => {
    const parts = text.split("*");
    const filteredParts = parts.filter((part) => part.trim() !== "");

    return (
      <ol type="1">
        {filteredParts.map((part, index) => (
          <li key={index}>{part}</li>
        ))}
      </ol>
    );
  };

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <div
            onClick={() => {
              history.push(`/recipes/${recipe.id}`);
            }}
          >
            <li key={recipe.id}>
              <img src={recipe.recipe_image}></img>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              {splitAndNumberedList(recipe.instructions)}
              {splitList(recipe.ingredients)}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
