import React, { useEffect, useState } from "react";
import "./SinglePostPage.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import CommentCard from "../../components/CommentCard/CommentCard";

const SinglePostPage = () => {
  const [selectedPost, setSelectedPost] = useState([]);
  // const [selectedPostUsername, setSelectedPostUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setSelectedPost([response.data]);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const getSelectedUsername = () => {
    if (selectedPost.length === 0) {
      return " ";
    } else {
      return selectedPost[0].username;
    }
  };

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
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = { commentBody: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div className="singlePost">
      <div className="singlePost__post">
        <div className="singlePost__postTitle">
          <p>
            Post by: <span>@{getSelectedUsername()}</span>
          </p>
        </div>
        {selectedPost.map((post, key) => {
          return <PostCard post={post} key={key} />;
        })}
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
            rows="3"
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
              <CommentCard comment={comment} key={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
