import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleRecipeThunk, updateRecipeThunk } from "../../store/recipe";

function UpdateRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [cook_time, setCook_time] = useState("");
  const [total_time, setTotal_time] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleRecipeThunk(id));
    setIsLoaded(true);
  }, [dispatch, id]);

  useEffect(() => {
    setTitle(singleRecipe.title || "");
    setDescription(singleRecipe.description || "");
    setInstructions(singleRecipe.instructions || "");
    setPrep_time(singleRecipe.prep_time || "");
    setCook_time(singleRecipe.cook_time || "");
    setTotal_time(singleRecipe.total_time || "");
    setIngredients(singleRecipe.ingredients || "");
  }, [singleRecipe]);

  function errorsChecked(
    title,
    description,
    instructions,
    prep_time,
    cook_time,
    total_time,
    ingredients
  ) {
    const errors = {};
    if (!title) errors.title = "Recipe title is required";
    if (!description) errors.description = "Recipe description is required";
    if (!prep_time) errors.prep_time = "Recipe prep time is required";
    if (!cook_time) errors.cook_time = "Recipe cook time is required";
    if (!total_time) errors.total_time = "Recipe total time is required";
    if (!ingredients) errors.ingredients = "Recipe ingredients are required";
    if (!instructions) errors.instructions = "Recipe instructions required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(
      title,
      description,
      instructions,
      prep_time,
      cook_time,
      total_time,
      ingredients
    );

    const updatedRecipe = {
      title,
      description,
      instructions,
      prep_time,
      cook_time,
      total_time,
      ingredients,
      user_id: userId,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateRecipeThunk(updatedRecipe, id));

      history.push(`/recipes/${response.id}`);
    }
  };

  return (
    <div>
      {isLoaded && (
        <form
          className="upload-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {hasSubmitted && errors.title && (
              <p className="upload-recipe-errors">{errors.title}</p>
            )}
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {hasSubmitted && errors.description && (
              <p className="upload-recipe-errors">{errors.description}</p>
            )}
          </div>
          <div>
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            {hasSubmitted && errors.instructions && (
              <p className="upload-recipe-errors">{errors.instructions}</p>
            )}
          </div>
          <div>
            <label htmlFor="prep_time">Prep Time (minutes):</label>
            <input
              type="number"
              value={prep_time}
              onChange={(e) => setPrep_time(e.target.value)}
            />
            {hasSubmitted && errors.prep_time && (
              <p className="upload-recipe-errors">{errors.prep_time}</p>
            )}
          </div>
          <div>
            <label htmlFor="cook_time">Cook Time (minutes):</label>
            <input
              type="number"
              value={cook_time}
              onChange={(e) => setCook_time(e.target.value)}
            />
            {hasSubmitted && errors.cook_time && (
              <p className="upload-recipe-errors">{errors.cook_time}</p>
            )}
          </div>
          <div>
            <label htmlFor="total_time">Total Time (minutes):</label>
            <input
              type="number"
              value={total_time}
              onChange={(e) => setTotal_time(e.target.value)}
            />
            {hasSubmitted && errors.total_time && (
              <p className="upload-recipe-errors">{errors.total_time}</p>
            )}
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            {hasSubmitted && errors.ingredients && (
              <p className="upload-recipe-errors">{errors.ingredients}</p>
            )}
          </div>
          <button type="submit">Update Recipe</button>
        </form>
      )}
    </div>
  );
}

export default UpdateRecipe;