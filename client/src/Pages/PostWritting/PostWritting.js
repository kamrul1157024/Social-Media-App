import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { getCookie } from "../../Cookie/Cookie";
import { getPostCreationURL } from "../../RestUrls/RestURL";
import { doesPostHasProblem } from "./PostVerification";
import "./PostWritting.css";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

const getTitle = (rawState) => rawState.blocks[0].text;

export class PostWritting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      richTrextInRaw: "",
      tags: [],
    };

    this.updateEditorState = this.updateEditorState.bind(this);
    this.setPostTags = this.setPostTags.bind(this);
  }

  updateEditorState(rawState) {
    this.setState({ richTrextInRaw: rawState });
  }

  setPostTags(userTags) {
    this.setState({ tags: userTags });
  }

  onButtonClick() {
    const { history } = this.props;

    if (doesPostHasProblem(this.state.richTrextInRaw)) return;

    let postData = {
      postTitle: getTitle(this.state.richTrextInRaw),
      postText: JSON.stringify(this.state.richTrextInRaw),
      tags: this.state.tags,
    };

    let jwt = getCookie("jwt");
    const headers = {
      "Content-Type": "application/json",
      Authorization: jwt,
    };
    axios
      .post(getPostCreationURL(), postData, { headers: headers })
      .then((res) => {
        toast.success("Your Post Has been created");
        if (history) history.push(`/post/${res.data.postId}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  render() {
    return (
      <div className="w3-container w3-center">
        <RichTextEditor
          updateEditorState={this.updateEditorState}
          setPostTags={this.setPostTags}
        />

        <button
          className="post-button btn btn-dark"
          onClick={this.onButtonClick.bind(this)}
        >
          Create Post
        </button>
      </div>
    );
  }
}

export default withRouter(PostWritting);
