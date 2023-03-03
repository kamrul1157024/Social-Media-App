import React from "react";
import Logout from "../Login_Register/Logout";
import UserInformation from "./UserInformation";
const UserLoggeIn = ({ user }) => {
  return (
    <span className="logged-in">
      <UserInformation user={user} />
      <Logout />
    </span>
  );
};

UserLoggeIn.propTypes = {};

export default UserLoggeIn;
