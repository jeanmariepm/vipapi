import React from "react";
import { Button } from "react-bootstrap";
import UserContext from "../context/userContext";

class LoginForm extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      display_form: "login",
    };
  }

  toggleRegister = () => {
    const current_form = this.state.display_form;
    this.setState({
      display_form: current_form === "login" ? "register" : "login",
    });
  };
  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  loginScreen = () => (
    <div>
      <form onSubmit={(e) => this.handle_login(e, this.state)}>
        <h4>Log In</h4>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={this.state.username}
            onChange={this.handle_change}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            onChange={this.handle_change}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="text-right">
          New to Veed?{" "}
          <Button variant="link" onClick={this.toggleRegister}>
            Please Sign Up
          </Button>
        </p>
      </form>
    </div>
  );

  registerScreen = () => (
    <div>
      <form onSubmit={(e) => this.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={this.state.username}
            onChange={this.handle_change}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            onChange={this.handle_change}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="text-right">
          Already signed up to Veed?
          <Button variant="link" onClick={this.toggleRegister}>
            Please Log In
          </Button>
        </p>
      </form>
    </div>
  );
  handle_login = async (e, data) => {
    e.preventDefault();
    /*     
    const result = await axios.post("http://localhost:8000/token-auth/", data);
    console.log("Logged in (data from server): ", result);

    const token = result.data.token;
    const username = result.data.user.username;
    localStorage.setItem("token", token);
 */
    this.context.loginHandler(data.username, data.password);
  };

  handle_signup = async (e, data) => {
    e.preventDefault();
    /* 
    const result = await axios.post("http://localhost:8000/home/users/", data);
    console.log("Signed in (data from server): ", result);
    const token = result.data.token;
    const username = result.data.username;
    localStorage.setItem("token", token);
 */
    this.context.signupHandler(data.username, data.password);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.display_form === "login"
          ? this.loginScreen()
          : this.registerScreen()}
      </React.Fragment>
    );
  }
}

export default LoginForm;
