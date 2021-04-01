import React, { Component } from "react";
import Deal from "./deal";
import Hand from "./hand";
import { Container, Row, Col } from "react-bootstrap";
import Auction from "./auction";
import BidBox from "./bidBox";
import Agent from "./agent";
import DealControl from "./dealControl";
import bridgeApi from "../api/bridgeApi";

const playerNames = { 0: "West", 1: "North", 2: "East", 3: "South" };
class Bridge extends Component {
  constructor(props) {
    super(props);
    this.begin = true;
  }
  componentDidMount() {
    this.startDeal();
  }

  startDeal = () => {
    this.deal = new Deal();

    if (this.begin && this.props.location.state) {
      const { hands, auction } = this.props.location.state;

      this.deal.setHands(JSON.parse(hands));
      this.auction = JSON.parse(auction);
    }

    this.agents = [];
    for (let a = 0; a < 4; a++) {
      this.agents.push(new Agent(this.deal.getHand(a)));
    }
    this.dealer = this.deal.getDealer();
    this.player = this.dealer;
    this.aiBid = this.agents[this.player].getBid();
    this.setState({ bids: [] });
  };
  doneDeal = () => {
    console.log("Redirect to Review page ", this.props);
    this.props.history.goBack();
  };

  nextDeal = () => {
    this.startDeal();
    this.auction = null;
    this.begin = false;
  };
  saveDeal = () => {
    const hands = JSON.stringify(this.deal.hands);
    const auction = JSON.stringify(this.state.bids);

    bridgeApi.saveDeal(hands, auction, (result) => {
      console.log("Deal saved:", result);
    });
    this.nextDeal();
  };

  getGoingBid = () => {
    let bids = [...this.state.bids];
    let bid;
    while ((bid = bids.pop())) {
      if (bid.match(/^\d/)) {
        return bid;
      }
    }
    return null;
  };

  placeBid = (bid) => {
    const bids = [...this.state.bids, bid];
    this.player = (this.dealer + bids.length) % 4;
    this.aiBid = this.agents[this.player].getBid(bids);
    this.setState({ bids });
  };

  undoBid = () => {
    console.log("Undoing last bid...");
    const bids = [...this.state.bids];
    bids.pop();
    this.player = (this.dealer + bids.length) % 4;
    this.aiBid = this.agents[this.player].getBid(bids);
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
    if (this.deal) return this.showHands(this.player);
    return null;
  }

  showOneHand(bidder, seat) {
    if (this.biddingOver() || bidder === seat)
      return (
        <React.Fragment>
          <Hand cards={this.deal.getHand(seat)} name={playerNames[seat]} />
        </React.Fragment>
      );
    return <Hand name={playerNames[seat]} />;
  }

  showHands(bidder) {
    return (
      <Container fluid>
        <Row>
          <Col>
            {this.auction && (
              <Auction
                title={"Saved Auction"}
                dealer={this.dealer}
                bids={this.auction}
                biddingOver={true}
              />
            )}
          </Col>
          <Col>{this.showOneHand(bidder, 1)} </Col>
          <Col>
            {this.biddingOver() && (
              <DealControl
                undoBid={this.undoBid}
                saveDeal={this.saveDeal}
                nextDeal={this.nextDeal}
                doneDeal={this.doneDeal}
                practiceMode={!this.auction}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Col>{this.showOneHand(bidder, 0)} </Col>
          </Col>
          <Col>
            <Auction
              dealer={this.dealer}
              bids={this.state.bids}
              biddingOver={bidder === -1}
            />
            {!this.biddingOver() && (
              <BidBox
                placeBid={this.placeBid}
                undoBid={this.undoBid}
                goingBid={this.getGoingBid()}
                allowUndo={this.state.bids.length > 0}
                doubleOption={this.getDoubleOption()}
                aiBid={this.aiBid}
              />
            )}
          </Col>
          <Col>
            <Col>{this.showOneHand(bidder, 2)} </Col>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Col>{this.showOneHand(bidder, 3)} </Col>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Bridge;
