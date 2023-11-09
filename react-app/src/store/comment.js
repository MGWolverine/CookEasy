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

// export const createCommentThunk = (comment, recipeId) => async (dispatch) => {
//   const response = await fetch(`/api/comments/create_comment`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(comment),
//   });

//   if (response.ok) {
//     const newComment = await response.json();
//     dispatch(createComment(newComment));
//     return newComment;
//   } else {
//     const errors = await response.json();
//     return errors;
//   }
// };

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

const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_COMMENTS:
      newState = { ...state, allComments: {} };
      newState.comments = action.comments;
      return newState;
    case CREATE_COMMENT:
      newState = { ...state, allComments: { ...state.allComments } };
      newState.allComments[action.comment.id] = action.comment;
      return newState;
    case UPDATE_COMMENT:
      newState = { ...state, allComments: { ...state.allComments } };
      newState.allComments[action.comment.id] = action.comment;
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState.allComments;
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
