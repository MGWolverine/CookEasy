import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentsReducer from './comment';
import recipesReducer from './recipe';
import session from './session'

// Combine reducers into a single rootReducer
const rootReducer = combineReducers({
  session,
  recipes: recipesReducer,
  comments: commentsReducer,
});


let enhancer;

// Check if the environment is production
if (process.env.NODE_ENV === 'production') {
  // If production, apply only thunk middleware
  enhancer = applyMiddleware(thunk);
} else {
  // If not production, apply thunk middleware
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Compose Redux DevTools Extension with other enhancers
  enhancer = composeEnhancers(applyMiddleware(thunk, logger)); // Apply thunk and logger middleware
}

// Configure the Redux store with rootReducer, preloadedState, and enhancer
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer); // Create and return the Redux store
};

export default configureStore;