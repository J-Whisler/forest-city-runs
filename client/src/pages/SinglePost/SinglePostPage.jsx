import React, { useEffect, useState } from "react";
import "./SinglePostPage.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import SinglePostCard from "../../components/SinglePostCard/SinglePostCard";

const SinglePostPage = () => {
  const [selectedPost, setSelectedPost] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setSelectedPost([response.data]);
      // setIsLoading(false);
    });
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="singlePost">
      <div className="singlePost__left">
        {selectedPost.map((post, key) => {
          return <SinglePostCard post={post} key={key} />;
        })}
      </div>
      <div className="singlePost__right">Comments</div>
    </div>
  );
};

export default SinglePostPage;
