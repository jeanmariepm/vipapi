import React, { Component } from "react";
import Deal from "./deal";
import Hand from "./hand";
import { Container, Row, Col } from "react-bootstrap";
import Auction from "./auction";
import BidBox from "./bidBox";

class Bridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: new Deal(),
      bids: [],
    };
  }

  placeBid = (bid) => {
    console.log("Bid:", bid);
    const bids = [...this.state.bids, bid];
    this.setState({ bids });
  };

  render() {
    const player = "South";
    const { deal } = this.state;
    const cards = deal.getHand(player);
    const dealer = deal.getDealer();
    const bids = this.state.bids;
    return (
      <Container>
        <Row>
          <Col style={{ maxWidth: 150 }}>
            <Hand cards={cards} name={player} />
          </Col>
          <Col style={{ maxWidth: 150 }}>
            <Auction dealer={dealer} bids={bids} />
          </Col>
          <Col>
            <BidBox placeBid={this.placeBid} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bridge;
