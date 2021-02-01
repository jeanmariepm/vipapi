import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./bridge.css";
import Hand from "./hand";

class Bridge extends Component {
  constructor(props) {
    super(props);
    const deal = this.shuffle();
    this.state = {
      deal: deal,
    };
  }
  startOver = () => {
    const deal = this.shuffle();
    this.setState((state) => ({
      deal: deal,
    }));
  };

  shuffle = () => {
    let cards = [];
    for (let i = 0; i < 52; i++) {
      cards[i] = i;
    }
    let card;
    let deal = [];

    for (let j = 0; j < 4; j++) {
      let player = { S: [], H: [], D: [], C: [] };
      for (let k = 0; k < 13; k++) {
        card = cards[Math.floor(Math.random() * cards.length)];
        cards.splice(cards.indexOf(card), 1);
        if (card < 13) player["S"].push(card);
        else if (card < 26) player["H"].push(card);
        else if (card < 39) player["D"].push(card);
        else if (card < 52) player["C"].push(card);
      }
      deal.push(player);
    }
    console.log("Shuffled: ", deal);
    return deal;
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
            <Hand player={this.state.deal[0]} />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Hand player={this.state.deal[1]} />
          </Col>
          <Col></Col>
          <Col>
            <Hand player={this.state.deal[2]} />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Hand player={this.state.deal[3]} />
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default Bridge;
