import React from "react";
import { FaClock } from "react-icons/fa";
const PostTime = ({ time }) => {
  const getPostTime = () => {
    let timeInMin = Math.abs(new Date() - new Date(time)) / (1000 * 60);
    timeInMin = Math.round(timeInMin);

    if (timeInMin > 24 * 60) {
      return Math.round(timeInMin / (24 * 60)) + "day";
    } else if (timeInMin > 60) {
      return Math.round(timeInMin / 60) + "hr";
    } else {
      return timeInMin + "min";
    }
  };

  return (
    <>
      <button
        style={{
          fontSize: "11px",
          borderRadius: "0px",
          border: "0px",
          backgroundColor: "crimson",
          height: "20px",
        }}
        className="badge badge-danger"
      >
        <FaClock style={{ fontSize: "15px" }} /> {getPostTime()}
      </button>
    </>
  );
};

PostTime.propTypes = {};

export default PostTime;
