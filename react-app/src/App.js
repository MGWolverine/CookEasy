import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import SingleRecipePage from "./components/SingleRecipePage";
import CreateRecipeForm from "./components/CreateRecipe";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UpdateRecipe from "./components/UpdateRecipe";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Dispatch an action to authenticate the user
    dispatch(authenticate()).then(() => setIsLoaded(true)); // assuming authenticate() is an asynchronous action
  }, [dispatch]); // Run the effect only when `dispatch` changes

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path="/recipes/:id/edit" component={UpdateRecipe} />
          <Route exact path='/recipes/create_recipe' component={CreateRecipeForm} />
          <Route exact path="/recipes/:id" component={SingleRecipePage} />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route> Page Not Found </Route>
        </Switch>
      )}
    </>
  );
}

export default App;