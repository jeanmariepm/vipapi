import React, { Component } from "react";
import { Link, NavLink, Switch, Route } from "react-router-dom";
import Addition from "./addition";
import BridgeGames from "./bridge/bridgeGames";
import TicTacToe from "./ttt/tictactoe";

class SideBar extends Component {
  render() {
    //const { path } = this.props.match;
    console.log("props", this.props);
    const path = window.location.pathname;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/opener">
                Bridge
              </NavLink>
              <NavLink className="nav-item nav-link" to="/ttt">
                TicTacToe
              </NavLink>
              <NavLink className="nav-item nav-link" to="/addition">
                Addition
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="tabs">
          <Switch>
            <Route path={"/bridge"} component={BridgeGames} />
            <Route path={"/ttt"} component={TicTacToe} />
            <Route path={"/addition"} component={Addition} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBar;
