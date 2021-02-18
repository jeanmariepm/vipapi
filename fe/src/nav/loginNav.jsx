import React from "react";
import LoginForm from "../login/loginForm";
import LogoutForm from "../login/logoutForm";
import axios from "axios";
import UserContext from "../context/userContext";

const LoginNav = () => {
  const { username, loggedIn } = React.useContext(UserContext);

  return (
    <div>
      {loggedIn ? (
        <LogoutForm handle_logout={handle_logout} />
      ) : (
        <LoginForm handle_login={handle_login} handle_signup={handle_signup} />
      )}
    </div>
  );
};

export default LoginNav;
