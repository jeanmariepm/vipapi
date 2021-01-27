import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Addition from "./components/addition";
import styles from "./index.css";
import { Container, Tabs, Tab } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamed: ["<Addition>", "<h2>tbd<h2>", "<h2>under construction<h2>"],
      current_index: 0,
    };
  }

  render = () => {
    return (
      <Container>
        <Tabs defaultActiveKey="addition" id="uncontrolled-tab-example">
          <Tab eventKey="addition" title="Addition">
            <Addition />
          </Tab>
          <Tab eventKey="tictactoe" title="Tic Tac Toe">
            <h2>Under construction</h2>
          </Tab>
          <Tab eventKey="bridge" title="Bridge" disabled>
            <h2>Another under construction</h2>
          </Tab>
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

  setCarouselIems = () => {
    return (
      <div className="carousel-inner">
        {this.state.games.map((game, index) => {
          return (
            <div
              className={`carousel-item {rhis.state.current_game === index? "active": ""}`}
            >
              {game}
            </div>
          );
        })}
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("App"));
