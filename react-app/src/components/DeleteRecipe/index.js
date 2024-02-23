import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRecipeThunk, getRecipesThunk } from "../../store/recipe";

function DeleteRecipe({ recipeId, submitted }) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();
  const history = useHistory();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRecipeThunk(recipeId)).then(closeModal);
    dispatch(getRecipesThunk());
    setExist(false);
    history.push("/");
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
          <div>Are you sure you want to delete this Recipe?</div>
          <button onClick={confirmDelete}>Yes (Delete Recipe)</button>
          <button onClick={cancelDelete}>No (Keep Recipe)</button>
        </div>
      )}
    </>
  );
}

export default DeleteRecipe;