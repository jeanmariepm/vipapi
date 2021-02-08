import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Opener from "./opener";
import TicTacToe from "../ttt/tictactoe";
import Bridge from "./bridge";
import styles from "./bridge.css";
import { Container, Nav, Tabs, Tab, Row, Col } from "react-bootstrap";

class BridgeGames extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        { name: "Bidding", comp: <Opener /> },
        { name: "Dbl Dummy", comp: <TicTacToe /> },
        { name: "Play 4", comp: <Bridge /> },
      ],

      current_index: 0,
    };
  }

  render = () => {
    return (
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={this.state.games[this.state.current_index].name}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {this.state.games.map((game) => {
                return (
                  <Nav.Link key={game.name} eventKey={game.name}>
                    {game.name}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {this.state.games.map((game) => {
                return (
                  <Tab.Pane key={game.name} eventKey={game.name}>
                    {game.comp}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  };
  handleSelect = (selectedIndex, e) => {
    console.log(`handleSelect ${e}`);
    this.setState((state) => {
      current_index: selectedIndex;
    });
  };
}
export default BridgeGames;
