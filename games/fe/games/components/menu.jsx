import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Addition from "./addition";
import BridgeGames from "./bridge/bridgeGames";
import TicTacToe from "./ttt/tictactoe";
import { Navbar, Nav } from "react-bootstrap";

class Menu extends Component {
  render() {
    //const { path } = this.props.match;
    const path = "";
    console.log(this.props);
    return (
      <React.Fragment>
        <Navbar collapseOnSelect className="navbar navbar-light bg-link">
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-start">
            <Nav>
              <Nav.Link href="/bridge">Bridge</Nav.Link>
              <Nav.Link href="/ttt">Tic Tac Toe</Nav.Link>
              <Nav.Link href="/addition">Addition</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="tabs">
          <Switch>
            <Route path={"/bridge"} exact component={BridgeGames} />
            <Route path={"/ttt"} component={TicTacToe} />
            <Route path={"/addition"} component={Addition} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
