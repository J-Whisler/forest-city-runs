import React, { useEffect, useState } from "react";
import "./SinglePostPage.scss";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CommentCard from "../../components/CommentCard/CommentCard";

const SinglePostPage = () => {
  const [selectedPost, setSelectedPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [createdAt, setCreatedAt] = useState("1/1/2000");
  const [selectedPostStats, setSelectedPostStats] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  // const [selectedPostPostDate, setSelectedPostPostDate] = useState();

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setSelectedPost(response.data);
      console.log(createdAt);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const showStats = () => {
    getSelectedPostPostDate();
    setSelectedPostStats(true);
  };
  const hideStats = () => {
    setSelectedPostStats(false);
  };

  const getSelectedPostPostDate = () => {
    const postDateFromSql = selectedPost.createdAt;
    const splitPostDateFromSql = postDateFromSql.split(/[- :]/);
    const getPostMonth = splitPostDateFromSql[1];
    const getPostDay = splitPostDateFromSql[2].substring(0, 2);
    const getPostYear = splitPostDateFromSql[0];
    setCreatedAt(`${getPostMonth}/${getPostDay}/${getPostYear}`);
  };

  return (
    <div className="singlePost">
      <div className="singlePost__content">
        <div className="singlePost__contentHeader">
          <div className="singlePost__contentHeaderBack">
            <Link className="singlePost__contentHeaderBackButton" to="/posts">
              <i className="fas fa-arrow-left"></i>
              <span>Back</span>
            </Link>
          </div>

          <div className="singlePost__contentHeaderPostBy">
            <h5>
              Post By: <span>@{selectedPost.username}</span>
            </h5>
          </div>
          <div className="singlePost__contentHeaderPostStats">
            {selectedPostStats ? (
              <>
                <div className="singlePost__contentHeaderPostShowStats">
                  <div className="singlePost__contentHeaderPostShowStatsLikes">
                    <div className="likes">
                      <h6>
                        Likes: <span>{selectedPost.Likes.length}</span>
                      </h6>
                    </div>
                  </div>
                  <div className="singlePost__contentHeaderPostStatsDivider"></div>
                  <div className="singlePost__contentHeaderPostShowStatsPostDate">
                    <div className="postDate">
                      <h6>
                        Posted On: <span>{createdAt}</span>
                      </h6>
                    </div>
                    <button
                      onClick={hideStats}
                      className="singlePost__contentHeaderPostHideStatsButton"
                    >
                      Hide Stats
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={showStats}
                  className="singlePost__contentHeaderShowStatsButton"
                >
                  Show Post Stats and Info
                </button>
              </>
            )}
          </div>
        </div>
        <main className="singlePost__contentMain">
          <article className="singlePost__contentMainPostText">
            {selectedPost.postText}
          </article>
        </main>
      </div>
      <div className="singlePost__comments">
        <div className="singlePost__addComment">
          <textarea
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            className="singlePost__addCommentTextarea"
            type="text"
            placeholder="Comment..."
            value={newComment}
            rows="2"
          />
          <button onClick={addComment} className="singlePost__addCommentButton">
            Add Comment
          </button>
        </div>
        <div className="singlePost__commentsList">
          <div className="singlePost__commentsListTitle">
            <h4>Comments</h4>
          </div>
          <div className="singlePost__commentsListComments">
            {comments.map((comment, key) => (
              <CommentCard
                comment={comment}
                key={key}
                comments={comments}
                setComments={setComments}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
