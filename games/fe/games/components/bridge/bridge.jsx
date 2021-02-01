import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./bridge.css";
import Hand from "./hand";

class Bridge extends Component {
  constructor(props) {
    super(props);
    const player = this.shuffle();
    this.state = {
      player: player,
    };
  }
  startOver = () => {
    const player = this.shuffle();
    this.setState((state) => ({
      player: player,
    }));
  };

  shuffle = () => {
    let cards = [];
    for (let i = 1; i <= 52; i++) {
      cards[i - 1] = i;
    }
    let card;
    let player = []; // = [{ S: [], H: [], D: [], C: [] }];

    for (let j = 0; j < 4; j++) {
      player.push({ S: [], H: [], D: [], C: [] });
      for (let k = 0; k < 13; k++) {
        card = cards[Math.floor(Math.random() * cards.length)];
        cards.splice(cards.indexOf(card), 1);
        if (card < 13) player[j]["S"].push(card);
        else if (card <= 26) player[j]["H"].push(card);
        else if (card <= 39) player[j]["D"].push(card);
        else if (card <= 52) player[j]["C"].push(card);
      }
    }
    console.log(player);
    return player;
  };

  render() {
    return (
      <div className="app">
        <h1>Under construction</h1>
        <Row>
          <Col>
            <Button onClick={this.startOver}>Redeal</Button>
          </Col>
          <Col>
            <Hand player={this.state.player[0]} />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Hand player={this.state.player[1]} />
          </Col>
          <Col></Col>
          <Col>
            <Hand player={this.state.player[2]} />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Hand player={this.state.player[3]} />
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default Bridge;
