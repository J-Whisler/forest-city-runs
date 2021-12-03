import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
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
          placeholder="Enter your desired username"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="login__formInput"
          placeholder="Enter your desired password"
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
