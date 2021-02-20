import React from "react";
import LoginForm from "../login/loginForm";
import LogoutForm from "../login/logoutForm";
import UserContext from "../context/userContext";

const LoginNav = () => {
  const { loggedIn } = React.useContext(UserContext);

  return <div>{loggedIn ? <LogoutForm /> : <LoginForm />}</div>;
};

export default LoginNav;
