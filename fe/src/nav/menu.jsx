import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Addition from "../games/addition/addition";
import TicTacToe from "../games/ttt/tictactoe";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Menu extends Component {
  render() {
    console.log("props", this.props);
    console.log("href", window.location);
    const path = window.location.pathname;
    const bridgePath = path + "bridge";
    const tttPath = path + "ttt";
    const additionPath = path + "addition";
    console.log("bridgePath:", bridgePath);
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Veed</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Ideas</Nav.Link>
              <NavDropdown title="Games" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={tttPath}>
                  Bridge
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={tttPath}>
                  TicTacToe
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  15 Puzzle
                </NavDropdown.Item>
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
        </Switch>
      </React.Fragment>
    );
  }
}

export default Menu;
