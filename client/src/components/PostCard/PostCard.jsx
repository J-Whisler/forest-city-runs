import React from "react";
import "./PostCard.scss";

const PostCard = ({ post }) => {
  return (
    <div className="postCard">
      <div className="postCard__user">
        <p>{post.username.substring(0, 1)}</p>
        <h6>@{post.username}</h6>
      </div>
      <div className="postCard__title">
        <h3>{post.title}</h3>
      </div>
      <div className="postCard__text">
        <p>{post.postText}</p>
      </div>
    </div>
  );
};

export default PostCard;
