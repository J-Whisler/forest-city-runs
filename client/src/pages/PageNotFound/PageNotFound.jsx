import React from "react";
import "./PageNotFound.scss";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <h1 className="pageNotFound__title">Page Not Found :/</h1>
      <h3 className="pageNotFound__directions">
        Go to Home Page:{" "}
        <Link to="/" className="pageNotFound__directionsLink">
          Home Page
        </Link>
      </h3>
    </div>
  );
};

export default PageNotFound;
