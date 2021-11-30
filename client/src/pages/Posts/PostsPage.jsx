import React, { useEffect, useState } from "react";
import "./PostsPage.scss";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";

const PostsPage = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [filterOptions, setFilterOptions] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="postsPage">
      <div className="postsPage__dropdown">
        <p>Sort By: </p>
        <div className="postsPage__dropdownFilterOptions">
          <h5
            onClick={() => setFilterOptions(true)}
            className={filterOptions ? "activeFilter" : ""}
          >
            Newest
          </h5>
          <div className="postPage__filterDivider"></div>
          <h5
            onClick={() => setFilterOptions(false)}
            className={!filterOptions ? "activeFilter" : ""}
          >
            Oldest
          </h5>
        </div>
      </div>
      <div
        className={
          filterOptions
            ? "postsPage__postsList newest"
            : "postsPage__postsList oldest"
        }
      >
        {listOfPosts.map((post, key) => {
          return <PostCard post={post} key={key} />;
        })}
      </div>
    </div>
  );
};

export default PostsPage;
