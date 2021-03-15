import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const BidBox = ({ placeBid }) => {
  const [bid, setBid] = useState("");

  const onPickBid = (event) => {
    const bid = event.target.value;
    if (bid === "Bid") return;
    setBid(bid);
  };
  const onPlaceBid = () => {
    if (bid) {
      placeBid(bid);
      setBid("");
    }
  };

  const getPicks = () => {
    let picks = [];
    for (let level = 1; level <= 7; level++)
      ["C", "D", "H", "S", "T"].forEach((suit) =>
        picks.push(`${level}${suit}`)
      );
    return picks;
  };
  let options = ["Bid", "Pass"];

  return (
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
          {getPicks().map((pick) => (
            <option key={pick}>{pick}</option>
          ))}
        </Form.Control>
      </Col>
      <Col sm={4}>
        <Button onClick={onPlaceBid} className=" ml-1">
          <i
            className="fa fa-paper-plane"
            title="Place bid"
            aria-hidden="true"
          ></i>
        </Button>
      </Col>
    </Row>
  );
};

export default BidBox;
