import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./PostCard.scss";

const PostCard = ({ post }) => {
  const [postDate, setPostDate] = useState(``);
  let history = useHistory();

  // Getting and formatting the post date
  const postDateFromSql = post.createdAt;
  const splitPostDateFromSql = postDateFromSql.split(/[- :]/);
  const getPostMonth = splitPostDateFromSql[1];
  const getPostDay = splitPostDateFromSql[2].substring(0, 2);
  const getPostYear = splitPostDateFromSql[0];

  useEffect(() => {
    setPostDate(`${getPostMonth}/${getPostDay}/${getPostYear}`);
  }, [getPostMonth, getPostDay, getPostYear]);
  console.log(post);
  return (
    <div
      className="postCard"
      onClick={() => {
        history.push(`/singlepost/${post.id}`);
      }}
    >
      <div className="postCard__user">
        <p>{post.username.substring(0, 1)}</p>
        <h6>@{post.username}</h6>
      </div>
      <div className="postCard__title">
        <h3>{post.title}</h3>
      </div>
      <div className="postCard__text">
        <p>{post.postText}</p>
        <p className="postCard__textPostDate">{postDate}</p>
      </div>
    </div>
  );
};

export default PostCard;
