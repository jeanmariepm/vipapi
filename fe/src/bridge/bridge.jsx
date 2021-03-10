import React, { Component } from "react";
import Deal from "./deal";
import Hand from "./hand";
import { Container, Row, Col } from "react-bootstrap";
import Auction from "./auction";

class Bridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: new Deal(),
    };
  }

  render() {
    const player = "South";
    const { deal } = this.state;
    const cards = deal.getHand(player);
    const dealer = deal.getDealer();
    return (
      <Container>
        <Row>
          <Col style={{ maxWidth: 150 }}>
            <Hand cards={cards} name={player} />
          </Col>
          <Col style={{ maxWidth: 150 }}>
            <Auction dealer={dealer} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bridge;
