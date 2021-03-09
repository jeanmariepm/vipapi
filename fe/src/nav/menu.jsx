import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Addition from "../puzzles/addition/addition";
import Home from "./home";
import TicTacToe from "../puzzles/ttt/tictactoe";
import Bridge from "../bridge/bridge";

const Menu = (props) => {
  const path = "/";
  const homePath = path;
  const bridgePath = path + "bridge";
  const tttPath = path + "ttt";
  const additionPath = path + "addition";

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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path={additionPath} component={Addition} />
        <Route path={tttPath} component={TicTacToe} />
        <Route path={bridgePath} component={Bridge} />

        <Route exact path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
};

export default Menu;
