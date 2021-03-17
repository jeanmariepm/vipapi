import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const BidBox = ({ placeBid, goingBid, biddingOver, doubleOption, aiBid }) => {
  const [bid, setBid] = useState("");

  const onPickBid = (event, aiBid) => {
    const bid = event.target.value;
    if (bid === "Bid") return;
    if (aiBid && (bidReverseMap[bid] || bid) !== aiBid) {
      setBid(bid);
      return;
    } else {
      placeBid(bidReverseMap[bid] || bid);
      setBid("");
      return;
    }
  };
  const onPlaceBid = () => {
    placeBid(bidReverseMap[bid] || bid);
    setBid("");
  };

  const onUndoBid = () => {
    setBid("");
  };

  const bidReverseMap = {
    Pass: "P",
    "1NT": "1T",
    "2NT": "2T",
    "3NT": "3T",
    "4NT": "4T",
    "5NT": "5T",
    "6NT": "6T",
    "7NT": "7T",
    Dbl: "X",
    RDbl: "XX",
  };
  const bidMap = {
    "": "-",
    "1T": "1NT",
    "2T": "2NT",
    "3T": "3NT",
    "4T": "4NT",
    "5T": "5NT",
    "6T": "6NT",
    "7T": "7NT",
    X: "Dbl",
    XX: "RDbl",
  };

  const getPicks = (goingBid) => {
    let picks = [];
    for (let level = 1; level <= 7; level++)
      ["C", "D", "H", "S", "T"].forEach((suit) => {
        const pick = `${level}${suit}`;
        if (!goingBid || pick > goingBid)
          return picks.push(bidMap[pick] || pick);
      });
    return picks;
  };

  const showConfirmPane = () => {
    return (
      <Card>
        <Card.Subtitle>
          <Row>Your bid: {bid}</Row>
          {aiBid && <Row>AI says: {bidMap[aiBid] || aiBid}</Row>}
        </Card.Subtitle>
        <Row>
          <Col sm={4}>
            <Button variant="link" size="sm" onClick={onPlaceBid}>
              <i
                className="fa fa-paper-plane"
                title="Place bid"
                aria-hidden="true"
              ></i>
            </Button>
          </Col>
          <Col sm={4}>
            <Button variant="link" size="sm" onClick={onUndoBid}>
              <i className="fa fa-undo" title="Undo bid" aria-hidden="true"></i>{" "}
            </Button>
          </Col>
        </Row>
      </Card>
    );
  };

  const showBiddingPane = () => {
    let options = ["Bid", "Pass"];
    if (doubleOption) options.push(doubleOption);

    return (
      <Card>
        <Row>
          <Col sm={8}>
            <Form.Control
              as="select"
              onChange={(event) => onPickBid(event, aiBid)}
              className="selectpicker btn-success "
              size="sm"
              value={"Bid"}
            >
              {options.map((option, idx) => (
                <option key={option}>{bidMap[option] || option}</option>
              ))}
              {getPicks(goingBid).map((pick) => (
                <option key={pick}>{pick}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </Card>
    );
  };

  if (!bid) return showBiddingPane();
  return showConfirmPane();
};

export default BidBox;
