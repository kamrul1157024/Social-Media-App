import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRegisterURL } from "../../RestUrls/RestURL";
import "./Form.css";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
      city: "",
      country: "",
      gender: "",
      dateOfBirth: "",
      emailVisible: "",
    };

    this.wrapper = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.getDateFromString = this.getDateFromString.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleGenderChange(event) {
    event.preventDefault();
    this.setState({ ...this.state, gender: event.target.value });
  }

  handleSubmit(event) {
    axios({
      method: "POST",
      url: getRegisterURL(),
      data: this.state,
    })
      .then(() => {
        toast.success("Successfully Regitered!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    event.preventDefault();
  }

  getInDateFormate(date) {
    return date.toISOString();
  }

  getDateFromString(date) {
    return new Date(date);
  }

  handleDateSelect(date) {
    this.setState({ dateOfBirth: this.getInDateFormate(date) });
  }

  handleDateChange(date) { }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <div className="login-box">
          <form onSubmit={this.handleSubmit} style={{ paddingTop: "450px" }}>
            <h3 className="display-4 w3-center"> RABBLE </h3>
            <div className="user-box">
              <input
                type="text"
                placeholder="Username"
                name="userName"
                onChange={this.handleChange}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <label>Email </label>
            </div>
            <div className="user-box">
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                onChange={this.handleChange}
              />
              <label>First Name</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={this.handleChange}
              />
              <label>Last Name</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                placeholder="Profile Picture Url"
                name="profilePicture"
                onChange={this.handleChange}
              />
              <label>Profile Picture URL</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={this.handleChange}
              />
              <label>Password</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                placeholder="City Name"
                name="city"
                onChange={this.handleChange}
              />
              <label>City </label>
            </div>

            <div className="user-box">
              <input
                type="text"
                placeholder="Country Name"
                name="country"
                onChange={this.handleChange}
              />
              <label>Country</label>
            </div>
            <div>
              <label>Gender: </label>
              <select
                value={this.state.gender}
                onChange={this.handleGenderChange}
              >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>

            <label>Date Of Birth</label>

            <div className="user-box">
              <DatePicker
                selected={this.getDateFromString(this.state.dateOfBirth)}
                onSelect={this.handleDateSelect}
                onChange={this.handleDateChange}
                scrollableMonthYearDropdown
                showYearDropdown
              />
            </div>
            <div style={{ margin: "10px" }}>
              <input
                name="emailVisible"
                className="form-check-input"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange}
              />
              <label className="form-check-label">Public Your Email </label>
            </div>
            <div className="w3-center" style={{ paddingTop: "10px" }}>
              <button type="submit" className="btn btn-danger">
                <b className="display-5"> REGISTER</b>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
