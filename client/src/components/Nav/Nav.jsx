import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { AuthContext } from "../../helpers/AuthContext";

const Nav = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="nav">
      <div className="nav__logo">
        <Link to="/" className="nav__logoLink">
          Forest City Runs
        </Link>
      </div>
      <div className="nav__links">
        <Link to="/" className="nav__linksLink link-home">
          Home
        </Link>
        <Link to="/posts" className="nav__linksLink">
          All Posts
        </Link>
        <Link to="/createpost" className="nav__linksLink">
          Create Post
        </Link>
        {!authState && (
          <>
            <Link to="/login" className="nav__linksLink">
              Login
            </Link>
            <Link to="/signup" className="nav__linksLink link-signup">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <div className="nav__social">
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-reddit"></i>
      </div>
    </div>
  );
};

export default Nav;
