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
    <div className="homepage-container">
      {recipes.map((recipe) => (
        <div
          className="recipe-item"
          onClick={() => {
            history.push(`/recipes/${recipe.id}`);
          }}
          key={recipe.id}
        >
          <img src={recipe.recipe_image} alt={recipe.title} />
          <div>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            {splitAndNumberedList(recipe.instructions)}
            {splitList(recipe.ingredients)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
