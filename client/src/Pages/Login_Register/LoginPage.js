import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "../../Cookie/Cookie";
import { getLogInURL } from "../../RestUrls/RestURL";
import "./Form.css";

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = { userName: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    axios({
      method: "post",
      url: getLogInURL(),
      data: this.state,
    })
      .then((res) => {
        const jwt = "Bearer " + res.data.jwt;
        console.log(jwt);
        setCookie("jwt", jwt, 2);
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Wrong username Or Password ");
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="login-box">
        <h3 className="display-4 w3-center"> RABBLE </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </div>
          <div className="user-box">
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="w3-center">
            <button type="submit" className="btn btn-primary">
              <b className="display-5"> LOGIN</b>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
