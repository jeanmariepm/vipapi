import React from "react";
import { Button } from "react-bootstrap";

const Login = ({ loginHandler, signupHandler }) => {
  let currentForm = "Login";

  const toggleForm = () => {
    currentForm = currentForm === "login" ? "register" : "login";
  };

  const loginScreen = () => {
    return (
      <div>
        <form onSubmit={(e) => handleLogin(e, this.state)}>
          <h4>Log In</h4>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
          <p className="text-right">
            New to Veed?{" "}
            <Button variant="link" onClick={toggleForm}>
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
        <form onSubmit={(e) => handleSignup(e, this.state)}>
          <h4>Sign Up</h4>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
          <p className="text-right">
            Already signed up to Veed?
            <Button variant="link" onClick={toggleForm}>
              Please Log In
            </Button>
          </p>
        </form>
      </div>
    );
  };
  const handleLogin = (e, data) => {
    e.preventDefault();
    loginHandler(data.username, data.password);
  };

  const handleSignup = (e, data) => {
    e.preventDefault();
    signupHandler(data.username, data.password);
  };

  return (
    <React.Fragment>
      {currentForm === "login" ? loginScreen() : registerScreen()}
    </React.Fragment>
  );
};

export default Login;
