import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Addition from "./addition";
import BridgeGames from "./bridge/bridgeGames";
import TicTacToe from "./ttt/tictactoe";
import { Navbar } from "react-bootstrap";

class Menu extends Component {
  render() {
    //const { path } = this.props.match;
    const path = "";
    console.log(this.props);
    return (
      <React.Fragment>
        <Navbar collapseOnSelect className="navbar navbar-light bg-link">
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Link to="/bridge">
              <p className="ml-2">Bridge</p>
            </Link>
            <Link to="/ttt">
              <p className="ml-2">TicTacToe</p>
            </Link>
            <Link to="/addition">
              <p className="ml-2">Addition</p>
            </Link>
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
