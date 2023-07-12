import React from "react";
import "./Booklet.css";
const BookletContent = ({ content }) => {
  const getStyle = (content) =>
    content.externalLink
      ? "content content-external"
      : "content content-internal";

  const onClickHandler = (e) => {
    e.preventDefault();
    window.open(content.link, "_blank");
  };

  return (
    <div className={getStyle(content)} onClick={onClickHandler}>
      <p className="content-title">{content.title}</p>
      <p className="content-details">{content.details}</p>
    </div>
  );
};

export default BookletContent;
