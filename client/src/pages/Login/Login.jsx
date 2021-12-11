import React, { useState, useContext } from "react";
import "./Login.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };

  return (
    <div className="login">
      <h4 className="login__title">LOGIN</h4>
      <div className="login__formContainer">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="login__formInput"
          placeholder="Enter your username"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="login__formInput"
          placeholder="Enter your password"
        />
        <div className="login__formButtons">
          <div className="formButtons__loginButtonContainer">
            <button onClick={login} className="login__btn">
              Login
            </button>
          </div>
          <div className="formButtons__signUpButtonContainer">
            <h6 className="signUp__btnHeader">Don't have an account?</h6>
            <Link to="signup" className="signUp__btn">
              Sign Up Here!
            </Link>
          </div>
        </div>
        {/* <div className="login__formContainterButtons">
          <div className="login__formContainerButtonsLogin">
            <button onClick={login} className="loginButton">
              Login
            </button>
          </div>

          <div className="login__formContainerButtonsSignUp">
            <h6 className="signupTitle">Don't have an account?</h6>
            <Link to="/signup" className="signup">
              Sign Up Here
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
