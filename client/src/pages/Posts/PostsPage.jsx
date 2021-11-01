import React, { useEffect, useState } from "react";
import "./PostsPage.scss";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";

const PostsPage = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="postsPage">
      {listOfPosts.map((post, key) => {
        return <PostCard post={post} key={key} />;
      })}
    </div>
  );
};

export default PostsPage;
