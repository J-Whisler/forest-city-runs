import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import HomePageBg from "../../assets/home.jpg";

const HomePage = () => {
  return (
    <div className="homePage">
      <img src={HomePageBg} alt="" />
      <div className="homePage__colorOverlay"></div>
      <div className="homePage__content">
        <h2>
          RUN <span>CLE.</span>
        </h2>
        <h5>
          A place to get and share all of the latest news, events, and
          happenings in the Cleveland, OH running community.
        </h5>
        <div className="homePage__contentButtons">
          <Link to="/posts" className="homePage__conrentButtonsLink posts">
            See All Posts
          </Link>
          <Link
            to="/createpost"
            className="homePage__conrentButtonsLink create"
          >
            Create A Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
