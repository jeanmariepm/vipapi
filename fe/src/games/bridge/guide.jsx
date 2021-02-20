import React, { useContext } from "react";
import UserContext from "../../context/userContext";

const Guide = () => {
  const userState = useContext(UserContext);
  return (
    <React.Fragment>
      <h2>Hello, {userState.username}!</h2>
      <strong>Getting started with bridge</strong>
    </React.Fragment>
  );
};

export default Guide;
