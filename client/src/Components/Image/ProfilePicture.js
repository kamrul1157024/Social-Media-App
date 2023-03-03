import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useHistory } from "react-router-dom";

const ProfilePicture = ({ user, shape }) => {
  const profilePicture = user.profilePicture;

  let getProfilePicture = (profilePicture) => {
    if (profilePicture) {
      return (
        <img
          src={profilePicture}
          className="rounded-circle"
          height={shape}
          width={shape}
          style={{ margin: "2px" }}
        />
      );
    } else {
      return <IoPersonCircle style={{ fontSize: "50px" }} />;
    }
  };

  const history = useHistory();
  const onClickHandler = (e) => {
    e.preventDefault();
    history.push(`/user/${user.userName}`);
  };

  return (
    <span onClick={onClickHandler}>{getProfilePicture(profilePicture)}</span>
  );
};

export default ProfilePicture;
