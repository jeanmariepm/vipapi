import React from "react";
import LoginForm from "../login/loginForm";
import LogoutForm from "../login/logoutForm";
import auth from "../common/authService";

const LoginNav = () => {
  const username = auth.getCurrentUser();

  return <div>{username ? <LogoutForm /> : <LoginForm />}</div>;
};

export default LoginNav;
