import React, { Component } from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import DealControls from "./dealControls";
import BidControls from "./bidControls";
import Hand from "./hand";

class Bridge extends Component {
  constructor(props) {
    super(props);
    const deal = this.shuffle();
    this.state = {
      deal: deal,
      reveal: true,
    };
  }
  show = () => {
    this.setState((state) => ({
      reveal: !this.state.reveal,
    }));
  };

  startOver = () => {
    const deal = this.shuffle();
    this.setState((state) => ({
      deal: deal,
      reveal: true,
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
      let player = { Spade: [], Heart: [], Diamond: [], Club: [] };
      for (let k = 0; k < 13; k++) {
        card = cards[Math.floor(Math.random() * cards.length)];
        cards.splice(cards.indexOf(card), 1);
        if (card < 13) player["Spade"].push(card);
        else if (card < 26) player["Heart"].push(card);
        else if (card < 39) player["Diamond"].push(card);
        else if (card < 52) player["Club"].push(card);
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
        <Container fluid>
          <Row>
            <Col>
              <DealControls
                startOver={this.startOver}
                show={this.show}
                reveal={this.state.reveal}
              />
            </Col>
            <Col>
              <Hand
                player={this.state.deal[0]}
                name="North"
                reveal={this.state.reveal}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Hand
                player={this.state.deal[1]}
                name="West"
                reveal={this.state.reveal}
              />
            </Col>
            <Col></Col>
            <Col>
              <Hand
                player={this.state.deal[2]}
                name="East"
                reveal={this.state.reveal}
              />
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Hand player={this.state.deal[3]} name="South" reveal={true} />
            </Col>
            <Col>
              <BidControls />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Bridge;
