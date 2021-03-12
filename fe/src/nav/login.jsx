import React, { useState } from "react";
import { Button } from "react-bootstrap";
import auth from "../api/auth";

const Login = ({ loginHandler, signupHandler }) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [formName, setFormrName] = useState("login");

  const loginScreen = () => {
    return (
      <div>
        <form onSubmit={(e) => handleLogin(e)}>
          <h4>Log In</h4>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <Button type="submit" className="btn btn-primary btn-block">
            Submit
          </Button>
          <p className="text-right">
            New to Veed?{" "}
            <Button variant="link" onClick={() => setFormrName("signup")}>
              Please Sign Up
            </Button>
          </p>
        </form>
      </div>
    );
  };

  const registerScreen = () => {
    return (
      <div>
        <form onSubmit={(e) => handleSignup(e)}>
          <h4>Sign Up</h4>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <Button type="submit" className="btn btn-primary btn-block">
            Submit
          </Button>
          <p className="text-right">
            Already signed up to Veed?
            <Button variant="link" onClick={() => setFormrName("login")}>
              Please Log In
            </Button>
          </p>
        </form>
      </div>
    );
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(userName, password, loginHandler);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    auth.signup(userName, password, signupHandler);
  };

  return (
    <React.Fragment>
      {formName === "login" ? loginScreen() : registerScreen()}
    </React.Fragment>
  );
};

export default Login;
