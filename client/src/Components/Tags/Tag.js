import React from "react";
import "./Tag.css";
const Tag = (props) => {
  let mainConfig = "btn tag-btn btn-sm btn-";
  let buttonConfig = (props) =>
    props.color ? mainConfig + props.color : mainConfig + "black";
  return (
    <>
      <button className={buttonConfig(props)}> {props.tag.tagName} </button>
    </>
  );
};

export default Tag;
