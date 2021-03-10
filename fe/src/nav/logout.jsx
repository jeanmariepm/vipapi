import React from "react";
import { Button } from "react-bootstrap";
import auth from "../api/auth";

const Logout = ({ logoutHandler }) => {
  console.log(logoutHandler);
  return (
    <React.Fragment>
      <h4>Log Out</h4>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          readOnly
          className="form-control"
          name="username"
          value={auth.getCurrentUser()}
        />
      </div>
      <Button variant="link" onClick={logoutHandler}>
        Submit{" "}
      </Button>
    </React.Fragment>
  );
};

export default Logout;
