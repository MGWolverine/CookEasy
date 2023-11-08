import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRecipeThunk } from "../../store/recipe";
import { useParams, Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipe from "../DeleteRecipe";
import { getCommentThunk } from "../../store/comment";
import "./SingleRecipePage.css";

function SingleRecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
  const allComments = useSelector((state) => state.comments.allComments);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    dispatch(getSingleRecipeThunk(id));
    dispatch(getCommentThunk());
    setIsLoaded(true);
  }, [dispatch, id]);

  console.log(allComments)
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
        </div>
      )}
      <div>
        <OpenModalButton
          buttonText={"Delete"}
          modalComponent={
            <DeleteRecipe
              recipeId={singleRecipe.id}
              submitted={() => setSubmitted(true)}
            />
          }
        />
      </div>
    </>
  );
}

export default SingleRecipePage;
