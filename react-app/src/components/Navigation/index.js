import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="main-header">
    <div className="header">
      <div className="logoDiv">
        <NavLink className="logo" exact to="/">
          CookEasy
        </NavLink>
      </div>
      {isLoaded && (
        <div className="profileButton">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
    {sessionUser ? (
                <NavLink className="create-recipe-link" to="/recipes/create_recipe">Create A Recipe!</NavLink>
            ) : (
              <p className="create-recipe-link" style={{ color: "white", width: "260px" }}>
                Sign up or log in to create a recipe!
              </p>
            )}
    </div>
  );
}

export default Navigation;