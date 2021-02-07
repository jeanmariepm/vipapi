import React, { Component } from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import styles from "./bridge.css";
import DealControls from "./dealControls";
import BidControls from "./bidControls";
import Deal from "./deal";
import Hand from "./hand";

class Opener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: new Deal().shuffle(),
    };
  }

  startOver = () => {
    const deal = new Deal();
    this.setState((state) => ({
      deal: new Deal().shuffle(),
    }));
  };

  render() {
    return (
      <Container fluid>
        <DealControls
          startOver={this.startOver}
          show={this.show}
          reveal={this.state.reveal}
        />
        <Hand player={this.state.deal[3]} name="South" reveal={true} />
        <BidControls />
      </Container>
    );
  }
}

export default Opener;
