import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const BidBox = ({
  placeBid,
  saveDeal,
  nextDeal,
  goingBid,
  biddingOver,
  doubleOption,
  aiBid,
}) => {
  const [bid, setBid] = useState("");

  const onPickBid = (event) => {
    const bid = event.target.value;
    if (bid === "Bid") return;
    setBid(bid);
  };
  const onUndoBid = () => {
    setBid("");
  };
  const onSaveDeal = () => {
    setBid("");
    saveDeal();
  };
  const onNextDeal = () => {
    setBid("");
    nextDeal();
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

  const onPlaceBid = () => {
    setBid("");
    placeBid(bidReverseMap[bid] || bid);
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

  let options = ["Bid", "Pass"];
  if (doubleOption) options.push(doubleOption);

  const showConfirmPane = () => {
    return (
      <Card>
        <Card.Subtitle>
          <Row>Your bid: {bid}</Row>
          {aiBid && <Row>AI says: {aiBid}</Row>}
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
        {showNextPane()}
      </Card>
    );
  };
  const showNextPane = () => {
    return (
      <Row>
        <Col sm={4}>
          <Button variant="link" size="sm" onClick={onNextDeal}>
            <i
              className="fa fa-arrow-right"
              title="Next deal"
              aria-hidden="true"
            ></i>
          </Button>
        </Col>

        <Col sm={4}>
          <Button variant="link" size="sm" onClick={onSaveDeal}>
            <i className="fa fa-save" title="Save deal" aria-hidden="true"></i>
          </Button>
        </Col>
      </Row>
    );
  };
  const showBiddingPane = () => {
    return (
      <Card>
        <Row>
          <Col sm={8}>
            <Form.Control
              as="select"
              onChange={onPickBid}
              className="selectpicker btn-success "
              size="sm"
              defaultValue={bid}
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

  if (biddingOver)
    return (
      <Card>
        <Card.Subtitle>Bidding Over! </Card.Subtitle>
        {showNextPane()}
      </Card>
    );
  if (!bid) return showBiddingPane();
  return showConfirmPane();
};

export default BidBox;
