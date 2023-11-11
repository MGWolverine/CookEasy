import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRecipeThunk } from "../../store/recipe";
import { useParams, Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipe from "../DeleteRecipe";
import UpdateComment from "../UpdateComment";
import DeleteComment from "../DeleteComment";
import { getCommentThunk } from "../../store/comment";
import "./SingleRecipePage.css";
import CreateComment from "../CreateComment";
import { useHistory } from "react-router-dom";

function SingleRecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
  // const allComments = useSelector((state) => state.comments.allComments);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingleRecipeThunk(id));
    dispatch(getCommentThunk());
    setIsLoaded(true);
  }, [dispatch, id]);

  const splitList = (text) => {
    const parts = text.split(".");
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
    const parts = text.split(".");
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

          <h1 className="single-recipe-title">{singleRecipe.title}</h1>
          <div className="single-recipe-photo-info">
            <div className="description-div">
              <p className="single-recipe-description">
                {singleRecipe.description}
              </p>
            </div>
            <div className="image-time-div">
              <img
                className="single-recipe-image"
                src={singleRecipe.recipe_image}
                alt={singleRecipe.title}
              />
              <div className="time-div">
                <p className="time">Prep: {singleRecipe.prep_time} min</p>
                <p className="time">Cook: {singleRecipe.cook_time} min</p>
                <p className="time">Total: {singleRecipe.total_time} min</p>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="ing-ins-div">
            <div className="single-recipe-ingredients">
              <h2>Ingredients:</h2>
              {singleRecipe.id && splitList(singleRecipe.ingredients)}
            </div>
            <div className="single-recipe-instructions">
              <h2>Instructions:</h2>
              {singleRecipe.id &&
                splitAndNumberedList(singleRecipe.instructions)}
            </div>
          </div>
          {singleRecipe?.comments?.length > 0 &&
            singleRecipe?.comments?.map((blurb) => (
              <>
                <p>{blurb.comment}</p>
                <div className="single-recipe-comment-buttons">
                  <div>
                    <OpenModalButton
                      buttonText={"Delete Comment"}
                      modalComponent={
                        <DeleteComment
                          currentComment={blurb}
                          recipeId={singleRecipe.id}
                          submitted={() => setSubmitted(true)}
                        />
                      }
                    />
                  </div>
                  <div>
                    <OpenModalButton
                      buttonText={"Update Comment"}
                      modalComponent={
                        <UpdateComment
                          currentComment={blurb}
                          recipeId={singleRecipe.id}
                          submitted={() => setSubmitted(true)}
                        />
                      }
                    />
                  </div>
                </div>
              </>
            ))}
        </div>
      )}
      <div className="single-recipe-buttons">
        <div>
          <OpenModalButton
            buttonText={"Create Comment"}
            modalComponent={
              <CreateComment
                recipeId={singleRecipe.id}
                submitted={() => setSubmitted(true)}
              />
            }
          />
        </div>
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
        <button
          onClick={() => history.push(`/recipes/${singleRecipe.id}/edit`)}
        >
          Update Recipe
        </button>
      </div>
    </>
  );
}

export default SingleRecipePage;
