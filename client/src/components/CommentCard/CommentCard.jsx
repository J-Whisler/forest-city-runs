import React from "react";
import "./CommentCard.scss";

const CommentCard = ({ comment }) => {
  return (
    <div className="commentCard">
      <p>{comment.commentBody}</p>
    </div>
  );
};

export default CommentCard;
