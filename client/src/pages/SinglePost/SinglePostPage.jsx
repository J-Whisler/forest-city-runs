import React from "react";
import "./SinglePostPage.scss";
import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  let { id } = useParams();

  return <div className="singlePost">{id}</div>;
};

export default SinglePostPage;
