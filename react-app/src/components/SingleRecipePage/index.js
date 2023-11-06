import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRecipeThunk } from "../../store/recipe";
import { useParams, Link } from "react-router-dom";
import "./SingleRecipePage.css";

function SingleRecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const singleRecipe = useSelector(state => state.recipes.singleRecipe);

  useEffect(() => {
    dispatch(getSingleRecipeThunk(id))
      setIsLoaded(true)
  }, [dispatch, id]);

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
    <>
    {isLoaded && (
      <div>
      <Link to="/">Back to All Recipes</Link>
      <img src={singleRecipe.recipe_image} alt={singleRecipe.title} />
      <h1>{singleRecipe.title}</h1>
      <p>{singleRecipe.description}</p>
      <h2>Instructions:</h2>
      {singleRecipe.id && splitAndNumberedList(singleRecipe.instructions)}
      <h2>Ingredients:</h2>
      {singleRecipe.id && splitList(singleRecipe.ingredients)}
    </div>)}
    </>
  );
}

export default SingleRecipePage;
