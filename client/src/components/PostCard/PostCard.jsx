import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./PostCard.scss";
import axios from "axios";

const PostCard = ({ post, listOfPosts, setListOfPosts, comments }) => {
  const [postDate, setPostDate] = useState(``);
  const [isLiked, setIsLiked] = useState();
  // const [comments, setComments] = useState([]);
  // console.log(comments);
  let history = useHistory();
  // console.log(post);

  // Getting and formatting the post date
  const postDateFromSql = post.createdAt;
  const splitPostDateFromSql = postDateFromSql.split(/[- :]/);
  const getPostMonth = splitPostDateFromSql[1];
  const getPostDay = splitPostDateFromSql[2].substring(0, 2);
  const getPostYear = splitPostDateFromSql[0];

  useEffect(() => {
    setPostDate(`${getPostMonth}/${getPostDay}/${getPostYear}`);
    if (post.Likes.length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [getPostMonth, getPostDay, getPostYear]);

  // console.log(post.Likes.length);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                setIsLiked(true);
                return { ...post, Likes: [...post.Likes, "like"] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                setIsLiked(false);
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div className="postCard">
      <div
        className="postCard__body"
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
        </div>
      </div>
      <div className="postCard__footer">
        <p className="postCard__textPostDate">{postDate}</p>
        <div className="postCard__footerStats">
          <div className="postCard__footerStatsLikes">
            <i
              className={
                isLiked ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up unliked"
              }
              onClick={() => likeAPost(post.id)}
            ></i>
            <span>{post.Likes.length}</span>
          </div>
          <div
            onClick={() => {
              history.push(`/singlepost/${post.id}`);
            }}
            className="postCard__footerStatsComments"
          >
            <i className="fas fa-comment"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
