import axios from "axios";
import React, { useState } from "react";
import { BsCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Medal from "../../../Components/Medal/Medal";
import { getCookie } from "../../../Cookie/Cookie";
import {
  getCommentPostURL,
  getCommentsForPostId,
} from "../../../RestUrls/RestURL";
import CommentEditor from "../../PostPage/Comment/CommentEditor/CommentEditor";
import "../Comment/Comment.css";
import Comment from "./Comment";
import { insertRepliesIntoComment } from "./commentService";
import { doesCommentHasProblem } from "./CommentEditor/CommentEditorVerify";

const Comments = ({ post }) => {
  const [comments, setcomments] = useState([]);
  const [showCommentEditor, setshowCommentEditor] = useState(false);
  const [commentTextInRaw, setcommentTextInRaw] = useState("");

  const commentOnClickHandler = () => {
    setshowCommentEditor(showCommentEditor ^ true);

    axios
      .get(getCommentsForPostId(post.postId))
      .then((res) => {
        const commentsWithReplies = insertRepliesIntoComment(res.data.content);
        setcomments(commentsWithReplies);
        window.scrollBy(0, 100);
      })
      .catch(() => toast.error("Connection Not Exist"));
  };

  const updateCommentReply = (replyTo, reply) => {
    const commentIndex = comments.findIndex(comment => comment.commentId === replyTo);
    if (!comments[commentIndex].replies) {
      comments[commentIndex].replies = [];
    }
    comments[commentIndex].replies.unshift(reply);
    setcomments([...comments]);
  };

  const buttonColor = () =>
    showCommentEditor ? "btn btn-primary" : "btn btn-danger";

  const onCommentPostClick = () => {
    if (doesCommentHasProblem(commentTextInRaw)) return;

    const jwt = getCookie("jwt");
    if (!jwt) {
      toast.error("You Need TO Login First To Comment");
      return;
    }

    const commentTextData = JSON.stringify(commentTextInRaw);

    const commentData = {
      commentFor: post.postId,
      commentText: commentTextData,
      commentForType: 'POST',
    };

    const headers = { Authorization: jwt };

    axios
      .post(getCommentPostURL(), commentData, { headers: headers })
      .then((res) => {
        setcomments([res.data, ...comments]);
        setshowCommentEditor(false);
        setshowCommentEditor(true);
        toast.success("Comment Posted", { autoClose: 1000 });
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div>
      <div style={{ paddingBottom: "8px" }}>
        <div className="row">
          <div className="col">
            <Medal post={post} />
          </div>

          <div className="col">
            <button
              className={buttonColor(CommentEditor)}
              onClick={commentOnClickHandler}
            >
              <b>Comment</b>{" "}
              {showCommentEditor ? <BsCaretRightFill /> : <BsCaretDownFill />}
            </button>
          </div>
        </div>
      </div>

      <div>
        {showCommentEditor == true && (
          <CommentEditor
            setcommentTextInRaw={setcommentTextInRaw}
            onCommentPostClick={onCommentPostClick}
          />
        )}
      </div>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} updateCommentReply={updateCommentReply} />
        ))}
    </div>
  );
};

Comments.propTypes = {};

export default Comments;
