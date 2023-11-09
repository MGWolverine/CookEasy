import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSingleRecipeThunk } from "../../store/recipe";

function UpdateComment({ currentComment }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
  const { closeModal } = useModal();
  const [comment, setComment] = useState("" || currentComment.comment);
  const [rating, setRating] = useState(0 || currentComment.rating);
  const [errors, setErrors] = useState({});

  function errorsChecked(comment, rating) {
    const errors = {};
    if (!comment) errors.comment = "Recipe comment is required";
    if (!rating) errors.rating = "Recipe rating is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(comment, rating);

    const commentObjUpdated = {
      comment: comment,
      rating: rating,
      user_id: user.id,
      recipe_id: singleRecipe.id,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await fetch(`/api/comments/${currentComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObjUpdated),
      });
      if (response.ok) {
        await response.json();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }

      setComment("");
      setRating(0);
      await dispatch(getSingleRecipeThunk(currentComment.recipe_id))
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <div>
        <div>
          <button onClick={handleClose}>X</button>
          <form
            className="upload-comment"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="comment">Comment:</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {errors.comment && (
                <p className="upload-comment-errors">{errors.comment}</p>
              )}
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              {errors.rating && (
                <p className="upload-comment-errors">{errors.rating}</p>
              )}
            </div>
          </form>
        </div>
        <button onClick={handleSubmit}>Update comment</button>
      </div>
    </>
  );
}

export default UpdateComment;
