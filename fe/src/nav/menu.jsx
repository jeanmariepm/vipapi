import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Addition from "../puzzles/addition/addition";
import Home from "./home";
import TicTacToe from "../puzzles/ttt/tictactoe";
import Bridge from "../bridge/bridge";
import Logout from "./logout";
import Login from "./login";
import auth from "../api/auth";

const Menu = (props) => {
  const path = "/";
  const homePath = path;
  const bridgePath = path + "bridge";
  const loginPath = path + "login";
  const logoutPath = path + "logout";

  const tttPath = path + "ttt";
  const additionPath = path + "addition";
  const nowLoggedIn = () => (auth.getCurrentUser() ? true : false);

  const [loggedIn, setLoggedIn] = useState(nowLoggedIn());
  const handler = () => {
    console.log("Logged in, signed up, or logged out");
    setLoggedIn(nowLoggedIn());
    props.history.goBack();
  };
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Veed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={homePath}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={bridgePath}>
              Bridge
            </Nav.Link>
            <NavDropdown title="Puzzles" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={tttPath}>
                TicTacToe
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">15 Puzzle</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={additionPath}>
                Addition
              </NavDropdown.Item>
            </NavDropdown>
            {loggedIn ? (
              <Nav.Link as={Link} to={logoutPath}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={loginPath}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path={additionPath} component={Addition} />
        <Route path={tttPath} component={TicTacToe} />
        <Route path={bridgePath} component={Bridge} />
        <Route
          path={loginPath}
          render={() => (
            <Login loginHandler={handler} signupHandler={handler} />
          )}
        />
        <Route
          path={logoutPath}
          render={() => <Logout logoutHandler={handler} />}
        />
        <Route exact path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
};

export default Menu;
