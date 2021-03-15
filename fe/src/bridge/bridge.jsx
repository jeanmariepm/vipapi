import React, { Component } from "react";
import Deal from "./deal";
import Hand from "./hand";
import { Container, Row, Col } from "react-bootstrap";
import Auction from "./auction";
import BidBox from "./bidBox";
import Agent from "./agent";

class Bridge extends Component {
  constructor(props) {
    super(props);
    this.deal = new Deal();
    const agent = new Agent(this.deal.getHand(this.deal.getDealer()));
    this.aiBid = agent.getBid();
    this.state = {
      deal: this.deal,
      bids: [],
    };
  }

  placeBid = (bid) => {
    console.log("Bid:", bid);
    const bids = [...this.state.bids, bid];
    this.aiBid = ""; // need to get next bid from agent
    this.setState({ bids });
  };

  render() {
    const { deal, bids } = this.state;
    const dealer = deal.getDealer();
    const player = (dealer + bids.length) % 4;
    const playerName = { 0: "West", 1: "North", 2: "East", 3: "South" }[player];
    const cards = deal.getHand(player);
    return (
      <Container>
        <Row>
          <Col style={{ maxWidth: 150 }}>
            <Hand cards={cards} name={playerName} />
          </Col>
          <Col style={{ maxWidth: 180 }}>
            <Auction dealer={dealer} bids={bids} aiBid={this.aiBid} />
          </Col>
          <Col style={{ maxWidth: 150 }}>
            <BidBox placeBid={this.placeBid} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bridge;
