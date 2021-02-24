import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Menu from "./nav/menu";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import UserContext from "./context/userContext";
import auth from "./common/authService";

const guestUsername = "Guest of JeanMarie";

class Veed extends React.Component {
  constructor(props) {
    super(props);
    console.log("Veed constructor", props);
    this.state = {
      username: guestUsername,
      loginHandler: this.loginHandler,
      signupHandler: this.signupHandler,
      logoutHandler: this.logoutHandler,
    };
  }

  onLoginComplete = () => {
    let loggedInUsername = auth.getCurrentUser();
    if (!loggedInUsername) loggedInUsername = guestUsername;
    this.setState({ username: loggedInUsername });
    this.props.history.goBack();
  };
  loginHandler = (username, password) => {
    auth.login(username, password, this.onLoginComplete);
  };
  signupHandler = (username, password) => {
    auth.signup(username, password);
    this.setState({ username: auth.getCurrentUser() });
    this.props.history.goBack();
  };

  logoutHandler = () => {
    auth.logout();
    this.onLoginComplete();
  };
  componentDidMount() {
    this.setState({ username: auth.getCurrentUser() });
  }

  render() {
    const userState = this.state;

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
