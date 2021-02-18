import React from "react";
import { Button } from "react-bootstrap";
import UserContext from "../context/userContext";

class LogoutForm extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    console.log(this.context);
  }

  handle_logout = () => {
    localStorage.removeItem("token");
    this.context.logoutHandler();
  };

  render() {
    return (
      <React.Fragment>
        <h4>Log Out</h4>
        <label htmlFor="username">Username</label>
        {this.context.username}
        <Button variant="link" onClick={() => this.handle_logout()}>
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default LogoutForm;
