import axios from "axios";
import React, { Component } from "react";
import Posts from "../../Components/Post/Posts";
import { getCookie } from "../../Cookie/Cookie";
import { getPostForPage } from "../../RestUrls/RestURL";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const jwt = getCookie("jwt");
    axios
      .get(getPostForPage(1), { headers: { Authorization: jwt } })
      .then((response) => this.setState({ posts: response.data }))
      .catch((error) => console.error(error));
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <div style={{ paddingTop: "70px" }}></div>
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-10 col-lg-5">
            {posts.length ? <Posts posts={posts} /> : null}
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default HomePage;
