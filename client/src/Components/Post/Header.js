import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import "./Post.css";

const Header = ({ post }) => {
  const dim = "40px";
  const postTime = post.creationDate;
  const user = post.user;
  const title = post.postTitle;

  return <UserInfo user={user} fontSize="16px" postTime={postTime} />;
};

Header.propTypes = {};

export default Header;
