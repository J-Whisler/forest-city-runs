import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav__logo">
        <Link to="/" className="nav__logoLink">
          Forest City Runs
        </Link>
      </div>
      <div className="nav__links">
        <Link to="/" className="nav__linksLink">
          Home
        </Link>
        <Link to="/posts" className="nav__linksLink">
          All Posts
        </Link>
        <Link to="/createpost" className="nav__linksLink">
          Create Post
        </Link>
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
