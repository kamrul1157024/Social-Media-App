import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import LoginPage from "../../Pages/Login_Register/LoginPage";
import RegisterPage from "../../Pages/Login_Register/RegisterPage";
import "./Log.css";

const Login_Register = (props) => {
  const [activeButton, setactiveButton] = useState({
    login: false,
    register: false,
  });

  const loginButtonText = (activeButton) =>
    activeButton.login ? "HIDE" : "LOGIN";
  const registerButtonText = (activeButton) =>
    activeButton.register ? "HIDE" : "REGISTER";

  const onClickLoginHandler = () => {
    setactiveButton((activeButton) => ({
      login: !activeButton.login,
      register: false,
    }));
  };

  const onClickRegisterHandler = () => {
    setactiveButton((activeButton) => ({
      login: false,
      register: !activeButton.register,
    }));
  };

  return (
    <div className="btn-group">
      <button type="button" className="btn-login" onClick={onClickLoginHandler}>
        {" "}
        {loginButtonText(activeButton)}{" "}
      </button>
      {activeButton.login && (
        <Modal open={activeButton.login}>
          <LoginPage />
        </Modal>
      )}
      <button
        type="button"
        className="btn btn-register"
        onClick={onClickRegisterHandler}
      >
        {" "}
        {registerButtonText(activeButton)}{" "}
      </button>
      {activeButton.register && (
        <Modal open={activeButton.register}>
          <RegisterPage />
        </Modal>
      )}
    </div>
  );
};

Login_Register.propTypes = {};

export default Login_Register;
