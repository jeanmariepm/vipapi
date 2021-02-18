import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Menu from "./nav/menu";
import "bootstrap/dist/css/bootstrap.css";
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
    this.setState({ username, loggedIn: true });
  };
  logoutandler = () => {
    this.setState({ username: this.guestUsername, loggedIn: false });
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const loggedIn = token ? true : false;

    if (loggedIn) {
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
      this.setState({ username, loggedIn });
    } else {
      console.log("Not logged in yet");
    }
  }

  render() {
    const userState = this.state;
    console.log(userState);

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
