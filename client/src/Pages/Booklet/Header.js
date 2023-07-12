import React from "react";
import UserInfo from "../../Components/UserInfo/UserInfo";

const Header = ({ booklet }) => {
  const dim = "40px";
  const postTime = booklet.creationDate;
  const user = booklet.user;
  return (
    <div className="media">
      <div className="media-body" style={{ paddingLeft: "5px" }}>
        <UserInfo user={user} fontSize="16px" postTime={postTime} />
      </div>
    </div>
  );
};

export default Header;
