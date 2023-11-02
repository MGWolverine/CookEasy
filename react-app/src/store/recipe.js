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

const updateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  recipe,
});

const deleteRecipe = (recipeId) => ({
  type: DELETE_RECIPE,
  recipeId,
});

//THUNKS
export const getRecipesThunk = () => (dispatch) => {
    const response = await fetch("/api/recipes");

    if (response.ok) {
        const recipes = await response.json();
        dispatch(loadAllRecipes(recipes));
        return recipes;
    } else {
        const errors = await response.json();
        return errors
    }
};

export const getSingleRecipeThunk = (recipeId) => (dispatch) => {
    const response = await fetch(`api/recipes/${recipeId}`);

    if (response.ok) {
        const recipe = await response.json();
        dispatch(loadSingleRecipe(recipe));
        return recipe;
    } else {
        const errors = await response.json();
        return errors
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
        return errors
    }
};

export const updateRecipeThunk = (recipe) => (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
    });
    if (response.ok) {
        const updatedRecipe = await response.json();
        dispatch(updateRecipe(updateRecipe));
        return updatedRecipe;
    } else {
        const errors = await response.json();
        return errors;
    }
}

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
}

const recipesReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_RECIPES:
            newState = {...state};
            newState.allRecipes = action.recipes;
            return newState;
        case GET_SINGLE_RECIPE:
            newState = {...state};
            newState.singleRecipe = action.recipe;
            return newState;
        case CREATE_RECIPE:
            newState = {...state};
            newState.allRecipes[action.recipe.id] = action.recipes;
            return newState;
        case UPDATE_RECIPE:
            newState = {...state};
            newState.singleRecipe = action.recipes;
            return newState;
        case DELETE_RECIPE:
            newState = { ...state };
            delete newState.allRecipes[action.recipeId];
            delete newState.singleRecipe;
            return newState;
    }
}

export default recipesReducer;