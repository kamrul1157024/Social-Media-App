import React from "react";
import { useHistory } from "react-router-dom";
import { getCurrentServerURL } from "../../RestUrls/RestURL";
const PostUrl = ({ postId }) => {
  const history = useHistory();
  const serverLink = getCurrentServerURL();
  const onClickHandler = () => {
    history.push(`/post/${postId}`);
  };

  return (
    <>
      <button
        onClick={onClickHandler}
        href=""
        className="w3-btn w3-black w3-round-xxlarge w3-margin-60"
      >
        READ MORE
      </button>
    </>
  );
};

PostUrl.propTypes = {};

export default PostUrl;
