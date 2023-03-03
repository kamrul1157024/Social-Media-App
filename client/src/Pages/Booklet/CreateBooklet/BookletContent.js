import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../ShowBooklet/Booklet.css";
import "./CreateBooklet.css";

const BookletContent = ({
  index,
  bookletContents,
  setbookletContents,
  content,
  setcontent,
}) => {
  const getStyle = (content) =>
    content.externalLink
      ? "content content-external"
      : "content content-internal";

  const onClickHandler = (e) => {
    e.preventDefault();
    window.open(content.link, "_blank");
  };

  const onDeleteClick = (e) => {
    e.preventDefault();
    console.log("Delete Clicked");
    setbookletContents(
      bookletContents.filter(
        (contentInList) => contentInList.serialNo != content.serialNo
      )
    );
  };

  return (
    <Draggable draggableId={"draggable-" + content.serialNo} index={index}>
      {(provided, snapshot) => (
        <div
          className={getStyle(content)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="row">
            <div className="col" onClick={onClickHandler}>
              <p className="content-title">{content.title}</p>
              <p className="content-details">{content.details}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BookletContent;
