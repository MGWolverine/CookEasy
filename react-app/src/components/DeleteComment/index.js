import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getSingleRecipeThunk } from "../../store/recipe";
import "./DeleteComment.css";

function DeleteComment({currentComment}) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();

  const confirmDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/comments/${currentComment.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await dispatch(getSingleRecipeThunk(currentComment.recipe_id))
        closeModal()
      } else {
        const errors = response.json();
        return errors;
      }
    setExist(false);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      {exist && (
        <div className="delete-recipe-modal">
          <h2 className="delete-recipe">Confirm Delete</h2>
          <div>Are you sure you want to remove this Comment?</div>
          <button onClick={confirmDelete}>Yes (Delete Comment)</button>
          <button onClick={cancelDelete}>No (Keep Comment)</button>
        </div>
      )}
    </>
  );
}

export default DeleteComment;
