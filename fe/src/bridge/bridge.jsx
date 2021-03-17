import React, { Component } from "react";
import Deal from "./deal";
import Hand from "./hand";
import { Container, Row, Col } from "react-bootstrap";
import Auction from "./auction";
import BidBox from "./bidBox";
import Agent from "./agent";
import DealControl from "./dealControl";

const playerNames = { 0: "West", 1: "North", 2: "East", 3: "South" };
class Bridge extends Component {
  constructor(props) {
    super(props);
    this.startDeal();
    this.state = {
      bids: [],
    };
  }

  startDeal = () => {
    this.deal = new Deal();
    const agent = new Agent(this.deal.getHand(this.deal.getDealer()));
    this.aiBid = agent.getBid();
    this.goingBid = "";
  };

  nextDeal = () => {
    this.startDeal();
    this.setState({ bids: [] });
  };
  saveDeal = () => {
    console.log("Save deal...");
    this.startDeal();
    this.setState({ bids: [] });
  };

  placeBid = (bid) => {
    console.log("Bid:", bid);
    if (bid.match(/^\d/)) this.goingBid = bid;
    const bids = [...this.state.bids, bid];
    this.aiBid = ""; // need to get next bid from agent
    this.setState({ bids });
  };

  undoBid = () => {
    console.log("Undoing last bid...");
    const bids = [...this.state.bids];
    bids.pop();
    this.aiBid = ""; // need to get next bid from agent
    this.setState({ bids });
  };

  biddingOver = () => {
    const bids = [...this.state.bids];
    if (bids.length >= 4) {
      const l = bids.length;
      if (bids[l - 1] === "P" && bids[l - 2] === "P" && bids[l - 3] === "P")
        return true;
    }
    return false;
  };
  getDoubleOption = () => {
    const bids = [...this.state.bids];
    let option;
    const l = bids.length;

    if (l === 0) return option;

    const lastBid = bids[l - 1];
    if (lastBid === "X") option = "XX";
    else if (lastBid !== "P") option = "X";
    else if (l >= 3) {
      const partnerBid = bids[l - 2];
      const lhoBid = bids[l - 3];
      if (partnerBid === "P") {
        if (lhoBid === "X") option = "XX";
        else if (lhoBid !== "P") option = "X";
      }
    }
    return option;
  };

  render() {
    if (this.biddingOver()) return this.showFinishedHands();
    return this.showBiddableHand();
  }

  showFinishedHands() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Hand cards={this.deal.getHand(1)} name={playerNames[1]} />
          </Col>
          <Col>
            <DealControl
              undoBid={this.undoBid}
              saveDeal={this.saveDeal}
              nextDeal={this.nextDeal}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Hand cards={this.deal.getHand(0)} name={playerNames[0]} />
          </Col>
          <Col>
            <Auction
              dealer={this.deal.getDealer()}
              bids={this.state.bids}
              biddingOver={true}
            />
          </Col>
          <Col>
            <Hand cards={this.deal.getHand(2)} name={playerNames[2]} />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Hand cards={this.deal.getHand(3)} name={playerNames[3]} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
  showBiddableHand() {
    const dealer = this.deal.getDealer();
    const player = (dealer + this.state.bids.length) % 4;

    return (
      <Container>
        <Row>
          <Col style={{ maxWidth: 150 }}>
            <Hand
              cards={this.deal.getHand(player)}
              name={playerNames[player]}
            />
          </Col>
          <Col style={{ maxWidth: 180 }}>
            <Auction
              dealer={this.deal.getDealer()}
              bids={this.state.bids}
              biddingOver={false}
            />
          </Col>
          <Col style={{ maxWidth: 150 }}>
            <BidBox
              placeBid={this.placeBid}
              undoBid={this.undoBid}
              goingBid={this.goingBid}
              allowUndo={this.state.bids.length > 0}
              doubleOption={this.getDoubleOption()}
              aiBid={this.aiBid}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bridge;
