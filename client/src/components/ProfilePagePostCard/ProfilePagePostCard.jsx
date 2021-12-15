import React, { useState, useEffect } from "react";
import "./ProfilePagePostCard.scss";
import { useHistory } from "react-router-dom";

const ProfilePagePostCard = ({ userPost }) => {
  const [userPostPostDate, setUserPostPostDate] = useState(``);
  // Getting and formatting the post date
  const postDateFromSql = userPost.createdAt;
  const splitPostDateFromSql = postDateFromSql.split(/[- :]/);
  const getPostMonth = splitPostDateFromSql[1];
  const getPostDay = splitPostDateFromSql[2].substring(0, 2);
  const getPostYear = splitPostDateFromSql[0];

  useEffect(() => {
    setUserPostPostDate(`${getPostMonth}/${getPostDay}/${getPostYear}`);
  }, [getPostMonth, getPostDay, getPostYear]);

  let history = useHistory();

  return (
    <div
      className="profilePagePostCard"
      onClick={() => history.push(`/singlepost/${userPost.id}`)}
    >
      <div className="profilePagePostCard__main">
        <h2 className="main__title">{userPost.title}</h2>
        <p className="main__postText">{userPost.postText}</p>
      </div>
      <div className="profilePagePostCard__footer">
        <span className="footer__date">{userPostPostDate}</span>
        <span className="footer__likes">
          Liked by {userPost.Likes.length} user
          {userPost.Likes.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

export default ProfilePagePostCard;
