import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Addition from "../games/addition/addition";
import TicTacToe from "../games/ttt/tictactoe";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Home from "./home";
import LoginNav from "./loginNav";
import UserContext from "../context/userContext";
import BridgeNav from "./bridgeNav";

const Menu = () => {
  const { username, loggedIn } = React.useContext(UserContext);
  const path = "/"; //window.location.pathname;
  const bridgePath = path + "bridge";
  const tttPath = path + "ttt";
  const loginNavPath = path + "login";
  const additionPath = path + "addition";
  console.log("bridgePath:", bridgePath);

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Veed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link href="#link">Ideas</Nav.Link>
            <NavDropdown title="Games" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={bridgePath}>
                Bridge
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={tttPath}>
                TicTacToe
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">15 Puzzle</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={additionPath}>
                Addition
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={loginNavPath}>
              {loggedIn ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path={additionPath} component={Addition} />
        <Route path={bridgePath} component={BridgeNav} />

        <Route path={tttPath} component={TicTacToe} />
        <Route path={loginNavPath} component={LoginNav} />
        <Route exact path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
};

export default Menu;
