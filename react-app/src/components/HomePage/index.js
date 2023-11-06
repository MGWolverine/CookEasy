import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);

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
          <li key={recipe.id}>
            <img src={recipe.recipe_image}></img>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            {splitAndNumberedList(recipe.instructions)}
            {splitList(recipe.ingredients)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
