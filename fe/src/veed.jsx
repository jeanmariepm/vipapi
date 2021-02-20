import React from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Menu from "./nav/menu";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import UserContext from "./context/userContext";

class Veed extends React.Component {
  guestUsername = "Guest of JeanMarie";
  constructor(props) {
    super(props);
    console.log("Veed constructor", props);
    this.state = {
      username: this.guestUsername,
      loggedIn: false,
      loginHandler: this.loginHandler,
      logoutHandler: this.logoutandler,
    };
  }

  loginHandler = (username) => {
    console.log(this.props);
    this.props.history.goBack();
    this.setState({ username, loggedIn: true });
  };
  logoutandler = () => {
    console.log(this.props);
    this.props.history.goBack();

    this.setState({ username: this.guestUsername, loggedIn: false });
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const loggedIn = token ? true : false;

    if (loggedIn) {
      console.log("Alreay logged in ");
      const user = jwtDecode(token);
      console.log("user", user);
      const username = user.username;
      this.setState({ username, loggedIn });
    } else {
      console.log("Not logged in yet");
    }
  }

  render() {
    const userState = this.state;
    console.log(userState);
    console.log(this.props);

    return (
      <UserContext.Provider value={userState}>
        <div className="container">
          <BrowserRouter>
            <Menu />
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    );
  }
}

export default Veed;
