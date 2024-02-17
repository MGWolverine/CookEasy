import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipeThunk } from "../../store/recipe";
import "./CreateRecipe.css";

function CreateRecipeForm({ submitted, id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipe_image, setRecipe_image] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [cook_time, setCook_time] = useState("");
  const [total_time, setTotal_time] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [errors, setErrors] = useState({});

  function errorsChecked(
    title,
    description,
    instructions,
    prep_time,
    cook_time,
    total_time,
    ingredients,
    recipe_image
  ) {
    const errors = {};
    if (!title) errors.title = "Recipe title is required";
    if (!description) errors.description = "Recipe description is required";
    if (!prep_time) errors.prep_time = "Recipe prep time is required";
    if (!cook_time) errors.cook_time = "Recipe cook time is required";
    if (!total_time) errors.total_time = "Recipe total time is required";
    if (!ingredients) errors.ingredients = "Recipe ingredients are required";
    if (!instructions) errors.instructions = "Recipe instructions required";
    if (!recipe_image) errors.recipe_image = "Recipe image is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(
      recipe_image,
      title,
      description,
      instructions,
      prep_time,
      cook_time,
      total_time,
      ingredients
    );

    const formData = new FormData();
    formData.append("recipe_image", recipe_image);
    formData.append("title", title);
    formData.append("user_id", user.id);
    formData.append("description", description);
    formData.append("instructions", instructions);
    formData.append("prep_time", prep_time);
    formData.append("cook_time", cook_time);
    formData.append("total_time", total_time);
    formData.append("ingredients", ingredients);

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createRecipeThunk(formData));
      setImageLoading(true);

      setTitle("");
      setDescription("");
      setInstructions("");
      setPrep_time("");
      setCook_time("");
      setTotal_time("");
      setIngredients("");
      history.push(`/recipes/${response.id}`);
    }
  };

  return (
    <div>
      <form
        className="upload-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="upload-recipe-errors">{errors.title}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="upload-recipe-errors">{errors.description}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="recipe_image">Recipe Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setRecipe_image(e.target.files[0])}
          />
          {errors.recipe_image && (
            <p className="upload-recipe-errors">{errors.recipe_image}</p>
          )}
          {imageLoading && <p>Loading...</p>}
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            placeholder="Please seperate instructions with a period. ex: (Place chicken in the oven.)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {errors.instructions && (
            <p className="upload-recipe-errors">{errors.instructions}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="prep_time">Prep Time (minutes):</label>
          <input
            type="number"
            value={prep_time}
            onChange={(e) => setPrep_time(e.target.value)}
          />
          {errors.prep_time && (
            <p className="upload-recipe-errors">{errors.prep_time}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cook_time">Cook Time (minutes):</label>
          <input
            type="number"
            value={cook_time}
            onChange={(e) => setCook_time(e.target.value)}
          />
          {errors.cook_time && (
            <p className="upload-recipe-errors">{errors.cook_time}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="total_time">Total Time (minutes):</label>
          <input
            type="number"
            value={total_time}
            onChange={(e) => setTotal_time(e.target.value)}
          />
          {errors.total_time && (
            <p className="upload-recipe-errors">{errors.total_time}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            placeholder="Please seperate ingredients with a period. ex: (2 pounds chicken.)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && (
            <p className="upload-recipe-errors">{errors.ingredients}</p>
          )}
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipeForm;
