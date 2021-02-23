import React from "react";
import { Button } from "react-bootstrap";
import UserContext from "../context/userContext";
import { render } from "react-dom";

class LogoutForm extends React.Component {
  static contextType = UserContext;

  render() {
    console.log("userState", this.context);

    return (
      <React.Fragment>
        <h4>Log Out</h4>
        <label htmlFor="username">Username</label>
        <strong>{this.context.username}</strong>
        <Button variant="link" onClick={() => this.context.logoutHandler()}>
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default LogoutForm;
