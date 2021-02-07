import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Addition from "./components/addition";
import TicTacToe from "./components/ttt/tictactoe";
import BridgeGames from "./components/bridge/bridgeGames";
import styles from "./index.css";
import { Container, Tabs, Tab } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        { name: "Addition", comp: <Addition /> },
        { name: "Tic Tac Toe", comp: <TicTacToe /> },
        { name: "Bridge", comp: <BridgeGames /> },
      ],

      current_index: 0,
    };
  }

  render = () => {
    return (
      <Container>
        <Tabs
          defaultActiveKey={this.state.games[this.state.current_index].name}
          id="uncontrolled-tab-example"
        >
          {this.state.games.map((game) => {
            return (
              <Tab key={game.name} eventKey={game.name} title={game.name}>
                {game.comp}
              </Tab>
            );
          })}
        </Tabs>
      </Container>
    );
  };

  handleSelect = (selectedIndex, e) => {
    console.log(`handleSelect ${e}`);
    this.setState((state) => {
      current_index: selectedIndex;
    });
  };
}

ReactDOM.render(<App />, document.getElementById("App"));
