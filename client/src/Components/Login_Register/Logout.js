import React from "react";
import { FiLogOut } from "react-icons/fi";
import eraseAll from "../../RemoveEveryThing/RemoveEveryhting";
import "./Log.css";
const Logout = (props) => {
  const onClickHandler = () => {
    eraseAll();
    window.location.reload();
  };

  return (
    <>
      <button type="button" className="btn-logout" onClick={onClickHandler}>
        <FiLogOut style={{ fontSize: "30px" }} />
      </button>
    </>
  );
};

Logout.propTypes = {};

export default Logout;
