import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import "./PostCard.scss";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const PostCard = ({
  post,
  listOfPosts,
  setListOfPosts,
  likedPosts,
  setLikedPosts,
}) => {
  const [postDate, setPostDate] = useState(``);
  const [isLiked, setIsLiked] = useState();

  const { authState } = useContext(AuthContext);

  let history = useHistory();

  // Getting and formatting the post date
  const postDateFromSql = post.createdAt;
  const splitPostDateFromSql = postDateFromSql.split(/[- :]/);
  const getPostMonth = splitPostDateFromSql[1];
  const getPostDay = splitPostDateFromSql[2].substring(0, 2);
  const getPostYear = splitPostDateFromSql[0];

  useEffect(() => {
    setPostDate(`${getPostMonth}/${getPostDay}/${getPostYear}`);

    if (post.Likes) {
    }
  }, [getPostMonth, getPostDay, getPostYear]);

  // console.log(post);

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
                console.log(response.data.liked);
                setIsLiked(true);
                return { ...post, Likes: [...post.Likes, "like"] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                setIsLiked(false);
                console.log(response.data.liked);

                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div className="postCard">
      <div className="postCard__header">
        <Link className="postCard__headerLink" to={`/profile/${post.UserId}`}>
          <span>{post.username.substring(0, 1)}</span>
          <h6>@{post.username}</h6>
        </Link>
      </div>
      <div
        className="postCard__main"
        onClick={() => {
          history.push(`/singlepost/${post.id}`);
        }}
      >
        <h3 className="postCard__mainPostTitle">{post.title}</h3>
        <p className="postCard__mainPostText">{post.postText}</p>
        <span className="postCard__mainPostDate">{postDate}</span>
        <div className="postCard__mainPostDivider"></div>
      </div>
      <div className="postCard__footer">
        <div className="postCard__footerStats">
          <div className="postCard__footerLikes">
            <i
              className={
                likedPosts.includes(post.id)
                  ? "fas fa-thumbs-up unlikeBtn"
                  : "fas fa-thumbs-up likeBtn"
              }
              onClick={() => likeAPost(post.id)}
            ></i>
            <span>{post.Likes.length}</span>
          </div>
          <div
            className="postCard__footerComments"
            onClick={() => history.push(`/singlepost/${post.id}`)}
          >
            <i className="fas fa-comment"></i>
            <span>Click here to see or add comments!</span>
          </div>
        </div>

        {authState.username === post.username && (
          <div
            onClick={() => deletePost(post.id)}
            className="postCard__footerDeleteButton"
          >
            <i
              onClick={() => deletePost(post.id)}
              className="i fas fa-trash-alt deletePostBtn"
            ></i>
            <span>Delete Post</span>
          </div>
        )}
      </div>
    </div>
    // <div className="postCard">
    //   <div
    //     className="postCard__body"
    //     onClick={() => {
    //       history.push(`/singlepost/${post.id}`);
    //     }}
    //   >
    //     <div className="postCard__user">
    //       <p>{post.username.substring(0, 1)}</p>
    //       <Link to={`/profile/${post.UserId}`}>
    //         <h6>@{post.username}</h6>
    //       </Link>
    //     </div>
    //     <div className="postCard__title">
    //       <h3>{post.title}</h3>
    //     </div>
    //     <div className="postCard__text">
    //       <p>{post.postText}</p>
    //     </div>
    //   </div>
    //   <div className="postCard__footer">
    //     <p className="postCard__textPostDate">{postDate}</p>
    //     <div className="postCard__footerDivider"></div>
    //     <div className="postCard__footerStats">
    //       <div className="postCard__footerStatsLikes">
    //         <i
    //           className={
    //             likedPosts.includes(post.id)
    //               ? "fas fa-thumbs-up unlikeBtn"
    //               : "fas fa-thumbs-up likeBtn"
    //           }
    //           onClick={() => likeAPost(post.id)}
    //         />
    //         <span>{post.Likes.length}</span>
    //       </div>
    //       <div
    //         onClick={() => {
    //           history.push(`/singlepost/${post.id}`);
    //         }}
    //         className="postCard__footerStatsComments"
    //       >
    //         <i className="fas fa-comment">
    //           <span>Click to see or add comments</span>
    //         </i>
    //       </div>
    //       {authState.username === post.username && (
    //         <i
    //           onClick={() => deletePost(post.id)}
    //           className="i fas fa-trash-alt deletePostBtn"
    //         >
    //           <span>Delete Post</span>
    //         </i>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default PostCard;
