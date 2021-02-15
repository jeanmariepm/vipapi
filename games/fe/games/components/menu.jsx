import React, { Component } from "react";
import { Link, NavLink, Switch, Route } from "react-router-dom";
import Addition from "./addition";
import BridgeGames from "./bridge/bridgeGames";
import TicTacToe from "./ttt/tictactoe";

class Menu extends Component {
  render() {
    console.log("props", this.props);
    console.log("href", window.location);
    const path = window.location.pathname;
    const bridgePath = path + "bridge";
    const tttPath = path + "ttt";
    console.log("bridgePath:", bridgePath);
    return (
      <React.Fragment>
        Menu
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to={bridgePath}>
                Bridge
              </NavLink>
              <NavLink className="nav-item nav-link" to={tttPath}>
                TicTacToe
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="tabs">
          <Switch>
            <Route path={bridgePath} component={Addition} />
            <Route path={tttPath} component={TicTacToe} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
