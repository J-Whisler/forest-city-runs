import React, { useState, useEffect } from "react";
import "./SinglePostCard.scss";

const SinglePostCard = ({ post }) => {
  const [selectedPostDate, setSelectedPostDate] = useState(``);
  //   let history = useHistory();

  // Getting and formatting the post date
  const postDateFromSql = post.createdAt;
  const splitPostDateFromSql = postDateFromSql.split(/[- :]/);
  const getPostMonth = splitPostDateFromSql[1];
  const getPostDay = splitPostDateFromSql[2].substring(0, 2);
  const getPostYear = splitPostDateFromSql[0];

  useEffect(() => {
    setSelectedPostDate(`${getPostMonth}/${getPostDay}/${getPostYear}`);
  }, [getPostMonth, getPostDay, getPostYear]);

  return (
    <div className="singlePostCard">
      <div className="singlePostCard__user">
        <p>{post.username.substring(0, 1)}</p>
        <h6>@{post.username}</h6>
      </div>
      <div className="singlePostCard__title">
        <h3>{post.title}</h3>
      </div>
      <div className="singlePostCard__text">
        <p>{post.postText}</p>
        <p className="postCard__textPostDate">{selectedPostDate}</p>
      </div>
    </div>
  );
};

export default SinglePostCard;
