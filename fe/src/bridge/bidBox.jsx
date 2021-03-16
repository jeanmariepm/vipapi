import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const BidBox = ({ placeBid, saveDeal, goingBid, aiBid }) => {
  const [bid, setBid] = useState("");

  const onPickBid = (event) => {
    const bid = event.target.value;
    if (bid === "Bid") return;
    setBid(bid);
  };
  const onUndoBid = () => {
    saveDeal();
  };
  const onSaveDeal = () => {
    console.log("Save deal...");
  };

  const onPlaceBid = () => {
    if (bid) {
      placeBid(bid);
      setBid("");
    }
  };

  const getPicks = (goingBid) => {
    let picks = [];
    for (let level = 1; level <= 7; level++)
      ["C", "D", "H", "S", "T"].forEach((suit) => {
        const pick = `${level}${suit}`;
        if (!goingBid || pick > goingBid) return picks.push(pick);
      });
    return picks;
  };
  let options = ["Bid", "Pass"];

  const showConfirmPane = () => {
    return (
      <Card>
        <Row>Your bid: {bid}</Row>
        {aiBid && <Row>AI says: {aiBid}</Row>}
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
          <Col sm={4}>
            <Button variant="link" size="sm" onClick={onSaveDeal}>
              <i
                className="fa fa-save"
                title="Save deal"
                aria-hidden="true"
              ></i>
            </Button>
          </Col>
        </Row>
      </Card>
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
                <option key={option}>{option}</option>
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
