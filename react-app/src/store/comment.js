//ACTION TYPE
const GET_COMMENTS = "comments/GET_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

//ACTION CREATORS
const loadAllComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

//THUNKS
export const getCommentThunk = (comments) => async (dispatch) => {
  const response = await fetch(`/api/comments/`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(loadAllComments(comments));
    return comments;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateCommentThunk = (comment, commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const updatedComment = await response.json();
    dispatch(updateComment(updatedComment));
    return updatedComment;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  } else {
    const errors = response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allComments: {},
};

// Define the commentsReducer function with initialState and action parameters
const commentsReducer = (state = initialState, action) => {
  let newState = {}; // Initialize a variable to hold the new state

  // Switch statement to handle different action types
  switch (action.type) {
    // Action type: GET_COMMENTS
    case GET_COMMENTS:
      // Create a new state object with allComments initialized as an empty object
      newState = { ...state, allComments: {} };
      // Set comments from action to the new state
      newState.comments = action.comments;
      // Return the new state
      return newState;

    // Action type: CREATE_COMMENT
    case CREATE_COMMENT:
      // Create a new state object with allComments cloned from the previous state
      newState = { ...state, allComments: { ...state.allComments } };
      // Add the new comment to allComments using its id as key
      newState.allComments[action.comment.id] = action.comment;
      // Return the new state
      return newState;

    // Action type: UPDATE_COMMENT
    case UPDATE_COMMENT:
      // Create a new state object with allComments cloned from the previous state
      newState = { ...state, allComments: { ...state.allComments } };
      // Update the comment in allComments using its id as key
      newState.allComments[action.comment.id] = action.comment;
      // Return the new state
      return newState;

    // Action type: DELETE_COMMENT
    case DELETE_COMMENT:
      // Create a new state object by cloning the previous state
      newState = { ...state };
      // Delete the allComments property from newState
      delete newState.allComments;
      // Return the new state
      return newState;

    // Default case: return the current state
    default:
      return state;
  }
};

export default commentsReducer;