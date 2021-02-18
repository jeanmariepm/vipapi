import React from "react";
import { Button } from "react-bootstrap";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      handle_signup: props.handle_signup,
      handle_login: props.handle_login,
      display_form: "login",
    };
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
      <form onSubmit={(e) => this.state.handle_login(e, this.state)}>
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
      <form onSubmit={(e) => this.state.handle_signup(e, this.state)}>
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
