import React from "react";
import { Button } from "react-bootstrap";
import auth from "../api/auth";

const Logout = ({ logoutHandler }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout(logoutHandler);
  };
  return (
    <React.Fragment>
      <form onSubmit={(e) => handleLogout(e)}>
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
        <Button type="submit" className="btn btn-primary btn-block">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Logout;
