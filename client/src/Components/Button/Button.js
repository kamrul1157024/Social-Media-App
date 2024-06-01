import React from "react";
const Button = ({ color, text }) => {
  return (
    <>
      {color === "black" && (
        <button className="w3-btn w3-black w3-round-xxlarge w3-margin-60">
          {" "}
          {text}
        </button>
      )}
      {color === "white" && (
        <button className="w3-btn w3-white w3-round-xxlarge w3-margin-60">
          {" "}
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
