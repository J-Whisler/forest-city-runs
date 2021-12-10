import React, { useState, useContext, useEffect } from "react";
import "./PostsPage.scss";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import { ListOfPostsContext } from "../../helpers/ListOfPostsContext";

const PostsPage = () => {
  const [filterOptions, setFilterOptions] = useState(true);
  const [listOfPosts, setListOfPosts] = useState([]);
  console.log(listOfPosts);

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
        {/* {listOfPosts.typeOf === undefined ? (
          ""
        ) : ( */}
        <>
          {listOfPosts.map((post, key) => {
            return (
              <PostCard
                listOfPosts={listOfPosts}
                setListOfPosts={setListOfPosts}
                post={post}
                key={key}
              />
            );
          })}
        </>
        {/* )} */}
      </div>
    </div>
  );
};

export default PostsPage;
