import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { AuthContext } from "../../helpers/AuthContext";

const Nav = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      usermame: "",
      id: 0,
      status: false,
    });
  };
  return (
    <div className={authState.status ? "nav logged-in" : "nav logged-out"}>
      <div className="nav__logo">
        <Link to="/" className="nav__logoLink">
          Forest City Runs
        </Link>
      </div>
      <div className="nav__links">
        <Link to="/" className="nav__linksLink link-home">
          Home
        </Link>
        <div className="nav__linksDivider"></div>
        <Link to="/posts" className="nav__linksLink">
          All Posts
        </Link>
        <div className="nav__linksDivider"></div>
        <Link to="/createpost" className="nav__linksLink">
          Create Post
        </Link>
        {!authState.status && (
          <>
            <div className="nav__linksDivider"></div>
            <Link to="/login" className="nav__linksLink">
              Login
            </Link>
            <div className="nav__linksDivider"></div>
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

      {authState.status && (
        <div className="nav__userInfo">
          <span>
            {authState.username === undefined
              ? ""
              : authState.username.substring(0, 1)}
          </span>
          <button onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Nav;
