import React from "react";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import "./Comment.css";
import CommentText from "./CommentText";
const CommentReply = ({ commentReply }) => {
  const user = commentReply.user;
  const fontSize = "14px";
  const postTime = commentReply.creationDate;
  return (
    <div>
      <div className="media mt-3">
        <div className="media-body">
          <UserInfo user={user} fontSize={fontSize} postTime={postTime} />
        </div>
      </div>
      <div className="comment-reply-text">
        <CommentText commentText={commentReply.commentText} />
      </div>
    </div>
  );
};

CommentReply.propTypes = {};

export default CommentReply;
