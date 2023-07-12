import axios from "axios";
import { useState } from "react";
import { BsFillReplyAllFill } from "react-icons/bs";
import { toast } from "react-toastify";
import UserInfo from "../../../Components/UserInfo/UserInfo";
import { getCookie } from "../../../Cookie/Cookie";
import {
  getCommentRepliesByCommentId,
  getCommentReplyPostURL,
} from "../../../RestUrls/RestURL";
import "./Comment.css";
import CommentEditor from "./CommentEditor/CommentEditor";
import { doesCommentHasProblem } from "./CommentEditor/CommentEditorVerify";
import CommentReply from "./CommentReply";
import CommentText from "./CommentText";

const Comment = ({ comment, updateCommentReply }) => {
  const [showCommentEditor, setshowCommentEditor] = useState(false);
  const [commentTextInRaw, setcommentTextInRaw] = useState("");

  const onCommentReplyClick = () => {
    setshowCommentEditor(showCommentEditor ^ true);
  };

  const onCommentPostClick = () => {
    if (doesCommentHasProblem(commentTextInRaw)) return;

    const jwt = getCookie("jwt");
    if (!jwt) {
      toast.error("You Need To Login First To Comment");
      return;
    }

    const commentTextData = JSON.stringify(commentTextInRaw);
    const commentData = { commentText: commentTextData };
    const headers = { Authorization: jwt };

    axios
      .post(getCommentReplyPostURL(comment.commentId), commentData, { headers: headers })
      .then((res) => {
        updateCommentReply(comment.commentId, res.data);
        setshowCommentEditor(false);
        setshowCommentEditor(true);
        toast.success("Comment Posted", { autoClose: 1000 });
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const user = comment.user;
  const postTime = comment.creationDate;

  return (
    <>
      <div className="media mt-3">
        <div className="row">
          <div className="col">
            <div className="media-body">
              <UserInfo user={user} fontSize="16px" postTime={postTime} />
            </div>
          </div>
          <div
            className="col reply-icon"
            style={{ color: showCommentEditor ? "blue" : "black" }}
          >
            <BsFillReplyAllFill onClick={onCommentReplyClick} />
          </div>
        </div>
      </div>

      <div className="comment">
        <CommentText commentText={comment.commentText} />
      </div>

      <div className="comment-reply">
        <div>
          {showCommentEditor == true && (
            <CommentEditor
              setcommentTextInRaw={setcommentTextInRaw}
              onCommentPostClick={onCommentPostClick}
            />
          )}
        </div>
        <div className="comment-reply-border">
          {comment.replies &&
            comment.replies.map((commentReply) => (
              <CommentReply
                key={commentReply.commentId}
                commentReply={commentReply}
              />
            ))}
        </div>
      </div>
    </>
  );
};

Comment.propTypes = {};

export default Comment;
