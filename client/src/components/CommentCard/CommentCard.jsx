import React from "react";
import "./CommentCard.scss";

const CommentCard = ({ comment }) => {
  return (
    <div className="commentCard">
      <span>@{comment.username}</span>
      <p>{comment.commentBody}</p>
    </div>
  );
};

export default CommentCard;
