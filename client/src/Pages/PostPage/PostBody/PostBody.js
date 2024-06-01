import React from "react";
import MetaData from "../../../Components/MetaData/MetaData";
import Comments from "../Comment/Comments";
import GenerateMetaData from "./GenerateMetaData";
import Header from "./Header";
import "./PostBody.css";
import PostRender from "./PostText";

const PostBody = ({ post }) => {
  return (
    <div>
      <MetaData {...GenerateMetaData(post)} />
      <div className="container">
        <header className=" w3-black" style={{ padding: "20px" }}>
          <Header post={post} />
        </header>
        <div className="post-text">
          <PostRender rawState={post.postText} />
        </div>
        <footer>
          <div className="comments w3-center">
            <Comments post={post} />
          </div>
        </footer>
      </div>
    </div>
  );
};

PostBody.propTypes = {};

export default PostBody;
