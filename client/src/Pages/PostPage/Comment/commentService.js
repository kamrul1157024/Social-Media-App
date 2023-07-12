export const insertRepliesIntoComment = (comments) => {
  const commentReplies = {};
  comments.forEach((comment) => {
    if (!commentReplies[comment.replyTo]) {
      commentReplies[comment.replyTo] = [];
    }
    if (comment.replyTo) {
      if (comment.replyTo) {
        commentReplies[comment.replyTo].push(comment);
      }
    }
  });

  return comments
    .filter(comment => !comment.replyTo)
    .map(comment => {
      comment.replies = commentReplies[comment.commentId];
      return comment;
    });
};
