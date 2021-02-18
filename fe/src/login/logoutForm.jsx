import React from "react";
import { Button } from "react-bootstrap";

class LogoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      handle_logout: props.handle_logout,
    };
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <h4>Log Out</h4>
        <label htmlFor="username">Username</label>
        {this.state.username}
        <Button variant="link" onClick={() => this.state.handle_logout()}>
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default LogoutForm;
