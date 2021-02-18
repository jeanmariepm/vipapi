import React, { useContext } from "react";
import UserContext from "../context/userContext";

const Home = () => {
  const userState = useContext(UserContext);
  return (
    <React.Fragment>
      <h2>Hello, {userState.username}!</h2>
      <p>To fully explore the site, register</p>
      <p>If you have already registered, please login</p>
      <br />
      <div className="alert alert-dark" role="alert">
        This is not a secure site. <br />
        Do NOT provide any sensitive or confidential data
      </div>
      <div className="jumbotron">
        <p>
          This site is built with Django and React. <br />
          It is the developer's playground for experimentation.
          <br />
          You are welcome to access
          <a href="https://github.com/jeanmariepm/veed.git">the source code</a>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Home;
