import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfilePage.scss";
import ProfilePagePostCard from "../../components/ProfilePagePostCard/ProfilePagePostCard";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState("");
  const [listOfUserPosts, setListOfUserPosts] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userJoinDate, setUserJoinDate] = useState();
  const [userLikes, setUserLikes] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/userinfo/${id}`).then((response) => {
      setUser(response.data);
    });
    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfUserPosts(response.data);
    });
  }, []);
  //   console.log(listOfUserPosts);

  const showStats = () => {
    getUserJoinDate();
    getUserLikes();
    setShowUserInfo(true);
  };
  const hideStats = () => {
    setShowUserInfo(false);
  };

  const getUserJoinDate = () => {
    const userJoinDateFromSql = user.createdAt;
    const splitUserJoinDateFromSql = userJoinDateFromSql.split(/[- :]/);
    const getUserJoinMonth = splitUserJoinDateFromSql[1];
    const getUserJoinPostDay = splitUserJoinDateFromSql[2].substring(0, 2);
    const getUserJoinPostYear = splitUserJoinDateFromSql[0];
    setUserJoinDate(
      `${getUserJoinMonth}/${getUserJoinPostDay}/${getUserJoinPostYear}`
    );
  };

  const getUserLikes = () => {
    let totalLikes = 0;
    listOfUserPosts.map((userPostLike) => {
      const likesLength = userPostLike.Likes.length;
      totalLikes = totalLikes + likesLength;
      setUserLikes(totalLikes);
    });
  };

  return (
    <div className="profilePage">
      <Link className="profilePage__backButton" to="/posts">
        <i className="fas fa-arrow-left"></i>
        <span>Back</span>
      </Link>
      <div className="profilePage__header">
        {user.username === undefined ? (
          ""
        ) : (
          <div className="profilePage__info">
            <div className="profilePage__infoTop">
              <h5>{user.username.substring(0, 1)}</h5>
              <div className="username">
                <h6>Username: </h6>
                <h3>{user.username}</h3>
              </div>
            </div>
            {/* <div className="profilePage__infoBottom"> */}
            {showUserInfo && (
              <div className="profilePage__infoStats">
                <h6 className="posts">
                  <span className="title">Posts:</span>{" "}
                  <span className="stat">{listOfUserPosts.length}</span>
                </h6>
                <h6 className="likes">
                  <span className="title">Likes Received (all posts):</span>{" "}
                  <span className="stat">{userLikes}</span>
                </h6>
                <h6 className="joined">
                  <span className="title">User since:</span>{" "}
                  <span className="stat">{userJoinDate}</span>
                </h6>
              </div>
            )}
            {/* </div> */}
            <div className="profilePage__infoButton">
              {showUserInfo ? (
                <>
                  <p className="button" onClick={hideStats}>
                    Hide User Info <i className="fas fa-chevron-up"></i>
                  </p>
                </>
              ) : (
                <>
                  <p className="button" onClick={showStats}>
                    See User Info <i className="fas fa-chevron-down"></i>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="profilePage__userPosts">
        {listOfUserPosts.map((userPost, key) => (
          <ProfilePagePostCard userPost={userPost} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
