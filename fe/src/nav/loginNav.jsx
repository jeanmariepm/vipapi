import React, { Component } from "react";
import LoginForm from "../login/loginForm";
import LogoutForm from "../login/logoutForm";
import axios from "axios";

class LoginNav extends Component {
  constructor(props) {
    super(props);
    console.log("LoginNav constructor", props);
    this.state = {
      logged_in: localStorage.getItem("token") ? true : false,
      username: "",
    };
  }

  async componentDidMount() {
    if (this.state.logged_in) {
      console.log("Alreay logged in ");
      const result = await axios.get(
        "http://localhost:8000/home/current_user/",
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Already authenticated (data from server): ", result);
      const username = result.data.user.username;
      this.setState({ username });
    } else {
      console.log("Not logged in yet");
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.logged_in ? (
          <LogoutForm
            username={this.state.username}
            handle_logout={this.handle_logout}
          />
        ) : (
          <LoginForm
            handle_login={this.handle_login}
            handle_signup={this.handle_signup}
          />
        )}
      </div>
    );
  }

  handle_login = async (e, data) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/token-auth/", data);
    console.log("Logged in (data from server): ", result);

    const token = result.data.token;
    const username = result.data.user.username;
    localStorage.setItem("token", token);
    this.setState({
      logged_in: true,
      username,
    });
  };

  handle_signup = async (e, data) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/home/users/", data);
    console.log("Signed in (data from server): ", result);
    const token = result.data.token;
    const username = result.data.username;
    localStorage.setItem("token", token);
    this.setState({
      logged_in: true,
      username,
    });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
    console.log("Logged out: ", this.state);
  };
}

export default LoginNav;
