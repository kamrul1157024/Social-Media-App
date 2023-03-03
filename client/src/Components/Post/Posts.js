import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
};

Posts.propTypes = {};

export default Posts;
