import PropTypes from "prop-types";
import React from "react";

const Title = ({ titleFont, title }) => {
  return (
    <>
      <span
        style={{
          fontSize: titleFont,
          fontFamily: "Garamond",
          wordWrap: "break-word",
        }}
      >
        <b> {title}</b>
      </span>
    </>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
