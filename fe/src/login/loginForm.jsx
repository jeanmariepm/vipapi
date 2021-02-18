import React from "react";
import { Button } from "react-bootstrap";
import UserContext from "../context/userContext";
import axios from "axios";

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
  componentDidMount() {
    console.log(this.context);
  }

  toggleRegister = () => {
    console.log("toggleRegister");
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
      <h3>New to Veed?</h3>
      <Button variant="link" onClick={this.toggleRegister}>
        Please Sign Up
      </Button>
    </div>
  );

  registerScreen = () => (
    <div>
      <form onSubmit={(e) => this.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
      <h3>Already signed up to Veed?</h3>
      <Button variant="link" onClick={this.toggleRegister}>
        Please Log In
      </Button>
    </div>
  );
  handle_login = async (e, data) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/token-auth/", data);
    console.log("Logged in (data from server): ", result);

    const token = result.data.token;
    const username = result.data.user.username;
    localStorage.setItem("token", token);
    this.context.loginHandler(username);
  };

  handle_signup = async (e, data) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/home/users/", data);
    console.log("Signed in (data from server): ", result);
    const token = result.data.token;
    const username = result.data.username;
    localStorage.setItem("token", token);
    this.context.loginHandler(username);
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
