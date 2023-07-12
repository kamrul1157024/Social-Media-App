import React, { useContext } from "react";
import { BiBookAdd } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { RiHome3Fill } from "react-icons/ri";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../GlobalContext/UserContext";
import "./Navbar.css";
import UserLoggeIn from "./UserLoggeIn";
import UserNotLoggedIn from "./UserNotLoggedIn";
export const NavigationBar = () => {
  const user = useContext(UserContext);

  const navbarType = (user) => {
    if (user) return <UserLoggeIn user={user} />;
    else return <UserNotLoggedIn />;
  };

  const history = useHistory();

  const onHomeClick = (e) => {
    e.preventDefault();
    history.push("/home");
  };

  const onPostCreateClick = (e) => {
    e.preventDefault();
    history.push("/writePost");
  };

  const onBookletCreateClick = (e) => {
    e.preventDefault();
    history.push("/createBooklet");
  };

  return (
    <div>
      <nav className="navbar fixed-top app-nav-bar ">
        <ul className="navbar-nav">
          <li className="nav-item d-inline">
            <span onClick={onHomeClick}>
              <RiHome3Fill style={{ fontSize: "35px", cursor: "pointer" }} />{" "}
            </span>
          </li>
          {user ? (
            <li className="nav-item d-inline">
              <span onClick={onPostCreateClick}>
                <IoCreateOutline
                  style={{ fontSize: "35px", cursor: "pointer" }}
                />
              </span>
            </li>
          ) : null}
          {user ? (
            <li className="nav-item d-inline">
              <span onClick={onBookletCreateClick}>
                <BiBookAdd style={{ fontSize: "32px", cursor: "pointer" }} />{" "}
              </span>
            </li>
          ) : null}
          <li className="nav-item d-inline">{navbarType(user)}</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
