import React from "react";
import { postTextFromRaw } from "./PostTextFromRaw";
const PostShortText = ({ post }) => {
  const postText = postTextFromRaw(post);

  return (
    <>
      <p className="text-justify">{postText.substr(0, 200)}.......</p>
    </>
  );
};

export default PostShortText;
