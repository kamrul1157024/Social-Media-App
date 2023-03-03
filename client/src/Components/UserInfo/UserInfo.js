import React from "react";
import Follow from "../Follow/Follow";
import PostTime from "../PostTIme/PostTime";
import Username from "../UserName/Username";
import "./userInfo.css";
const UserInfo = ({ user, fontSize, postTime }) => {
  return (
    <div className="app-container">
      <div className="profile-picture">
        <img src={user.profilePicture} className="profile-picture" />
      </div>
      <div className="app-user-name">
        <Username user={user} fontSize={fontSize} />
      </div>

      <div className="post-time">
        <PostTime time={postTime} />
      </div>
      <div className="follow">
        <Follow user={user} size="12.8" />
      </div>
    </div>
  );
};

UserInfo.propTypes = {};

export default UserInfo;
