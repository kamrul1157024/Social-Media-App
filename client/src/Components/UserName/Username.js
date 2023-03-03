import React from "react";
import { useHistory } from "react-router";
import "./userName.css";
const Username = ({ user, fontSize, color }) => {
  const modify = (name) =>
    name ? name.charAt(0).toUpperCase() + name.substr(1) : "";

  const fullName = (user) =>
    modify(user.firstName) + " " + modify(user.lastName);

  const history = useHistory();

  const onClickHandler = (e) => {
    e.preventDefault();
    history.push(`/user/${user.userName}`);
    window.location.reload();
  };

  const userNameStyles = {
    fontSize: fontSize,
    color: color,
    fontFamily: "Sans-serif",
    cursor: "pointer",
  };

  return (
    <>
      <span
        style={userNameStyles}
        className="text-nowrap"
        onClick={onClickHandler}
      >
        <b>{fullName(user)}</b>
      </span>
    </>
  );
};

Username.propTypes = {};

export default Username;
