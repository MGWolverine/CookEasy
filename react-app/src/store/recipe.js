//ACTION TYPE
const GET_RECIPES = "recipes/GET_RECIPES";
const GET_SINGLE_RECIPE = "recipes/GET_SINGLE_RECIPE";
const CREATE_RECIPE = "recipes/CREATE_RECIPE";
const UPDATE_RECIPE = "recipes/UPDATE_RECIPE";
const DELETE_RECIPE = "recipes/DELETE_RECIPE";

//ACTION CREATORS
const loadAllRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});

const loadSingleRecipe = (recipe) => ({
  type: GET_SINGLE_RECIPE,
  recipe,
});

const createRecipe = (recipe) => ({
  type: CREATE_RECIPE,
  recipe,
});

const updateRecipe = (form) => ({
  type: UPDATE_RECIPE,
  form,
});

const deleteRecipe = (recipeId) => ({
  type: DELETE_RECIPE,
  recipeId,
});

//THUNKS
export const getRecipesThunk = () => async (dispatch) => {
  const response = await fetch("/api/recipes/");

  if (response.ok) {
    const recipes = await response.json();
    dispatch(loadAllRecipes(recipes));
    return recipes;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getSingleRecipeThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${id}`);

  if (response.ok) {
    const recipe = await response.json();
    dispatch(loadSingleRecipe(recipe));
    return recipe;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createRecipeThunk = (recipe) => async (dispatch) => {
  const response = await fetch(`/api/recipes/create_recipe`, {
    method: "POST",
    body: recipe,
  });
  if (response.ok) {
    const newRecipe = await response.json();
    dispatch(createRecipe(newRecipe));
    return newRecipe;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateRecipeThunk = (form, recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (response.ok) {
    const updatedRecipe = await response.json();
    dispatch(updateRecipe(updatedRecipe));
    return updatedRecipe;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteRecipe(recipeId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allRecipes: {},
  singleRecipe: {},
};

const recipesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_RECIPES:
      newState = {
        ...state,
        allRecipes: { ...state.allRecipes },
        singleRecipe: { ...state.singleRecipe },
      };
      action.recipes.forEach((recipe) => {
        newState.allRecipes[recipe.id] = recipe;
      });
      return newState;
    case GET_SINGLE_RECIPE:
      newState = {
        ...state,
        singleRecipe: { ...state.singleRecipe },
        allRecipes: { ...state.allRecipes },
      };
      newState.singleRecipe = action.recipe;
      return newState;
    case CREATE_RECIPE:
      newState = {
        ...state,
        singleRecipe: { ...state.singleRecipe },
        allRecipes: { ...state.allRecipes },
      };
      newState.allRecipes[action.recipe.id] = action.recipe;
      newState.singleRecipe[action.recipe.id] = action.recipe;
      return newState;
    case UPDATE_RECIPE:
      newState = {
        ...state,
        singleRecipe: { ...state.singleRecipe },
        allRecipes: { ...state.allRecipes },
      };
      newState.singleRecipe = action.form;
      return newState;
    case DELETE_RECIPE:
      newState = {
        ...state,
        allRecipes: { ...state.allRecipes },
        singleRecipe: { ...state.singleRecipe },
      };
      delete newState.allRecipes[action.recipeId];
      delete newState.singleRecipe[action.recipeId];
      return newState;
    default:
      return state;
  }
};

export default recipesReducer;
