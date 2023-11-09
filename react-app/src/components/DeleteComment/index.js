import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeleteRecipe() {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();
  const history = useHistory();

  const confirmDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteRecipeThunk(recipeId)).then(closeModal);
    await dispatch(getRecipesThunk());
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
          <button onClick={handleClose}>X</button>
          <h2 className="delete-recipe">Confirm Delete</h2>
          <div>Are you sure you want to remove this Comment?</div>
          <button onClick={confirmDelete}>Yes (Delete Comment)</button>
          <button onClick={cancelDelete}>No (Keep Comment)</button>
        </div>
      )}
    </>
  );
}

export default DeleteRecipe;
