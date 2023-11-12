import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleRecipeThunk } from "../../store/recipe";

function CreateComment() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
  const { closeModal } = useModal();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
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

    const commentForm = new FormData();
    commentForm.append("comment", comment);
    commentForm.append("rating", rating);
    commentForm.append("user_id", user.id);
    commentForm.append("recipe_id", singleRecipe.id);

    const commentObj = {
      comment: comment,
      rating: rating,
      user_id: user.id,
      recipe_id: singleRecipe.id,
    };
    let newComment;
    if (Object.keys(errorsFound).length === 0) {
      const response = await fetch(`/api/comments/create_comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObj),
      });
      if (response.ok) {
        newComment = await response.json();
        await dispatch(getSingleRecipeThunk(newComment.recipe_id))
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }

      setComment("");
      setRating(0);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <div className="delete-recipe-modal">
        <div>
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
                min={1}
                max={5}
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
        <button onClick={handleSubmit}>Submit comment</button>
      </div>
    </>
  );
}

export default CreateComment;
