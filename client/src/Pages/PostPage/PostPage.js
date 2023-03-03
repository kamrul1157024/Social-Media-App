import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../Cookie/Cookie";
import { getPostById } from "../../RestUrls/RestURL";
import PostBody from "./PostBody/PostBody";

const PostPage = (props) => {
  const postId = props.match.params.postId;

  const [post, setpost] = useState("");

  useEffect(() => {
    let jwt = getCookie("jwt");
    console.log(jwt);
    axios
      .get(getPostById(postId), { headers: { Authorization: jwt } })
      .then((res) => setpost(res.data))
      .catch((err) => console.log("Error\n", err));
  }, []);

  return (
    <div style={{ paddingTop: "60px" }}>
      {post != "" ? <PostBody post={post} /> : null}
    </div>
  );
};

export default PostPage;
