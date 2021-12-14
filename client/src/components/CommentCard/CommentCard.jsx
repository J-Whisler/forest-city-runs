import React, { useContext } from "react";
import "./CommentCard.scss";

import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CommentCard = ({ comment, comments, setComments }) => {
  const { authState } = useContext(AuthContext);
  let history = useHistory();
  // console.log(authState);

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setComments(
          comments.filter((comment) => {
            return comment.id !== id;
          })
        );
      });
  };

  return (
    <div className="commentCard">
      <div className="commentCard__content">
        <span>@{comment.username}</span>
        <p>{comment.commentBody}</p>
      </div>

      <div
        className={
          authState.username === comment.username
            ? "commentCard__divider authUser"
            : "commentCard__divider"
        }
      ></div>
      <div
        className={
          authState.username === comment.username
            ? "commentCard__delete authUser"
            : "commentCard__delete"
        }
        onClick={() => deleteComment(comment.id)}
      >
        {authState.username === comment.username && (
          <>
            <span>Delete Comment</span>
            <i className="fas fa-trash-alt"></i>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
