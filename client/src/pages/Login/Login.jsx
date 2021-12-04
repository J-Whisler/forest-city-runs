import React, { useState, useContext } from "react";
import "./Login.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

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

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
