import React, { useState } from "react";
import { Button } from "react-bootstrap";

const BidBox = ({ placeBid }) => {
  const [bid, setBid] = useState("Pass");
  const onPickBid = (event) => {
    setBid(event.target.value);
  };
  const onPlaceBid = () => {
    placeBid(bid);
  };

  const getPicks = () => {
    let picks = [];
    for (let level = 1; level <= 7; level++)
      ["C", "D", "H", "S", "NT"].forEach((suit) =>
        picks.push(`${level}${suit}`)
      );
    return picks;
  };
  let options = ["Pass"];

  return (
    <React.Fragment>
      <select onChange={onPickBid} className="selectpicker btn-success ">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
        {getPicks().map((pick) => (
          <option key={pick}>{pick}</option>
        ))}
      </select>
      <Button onClick={onPlaceBid} className=" ml-1">
        <i
          className="fa fa-paper-plane"
          title="Place bid"
          aria-hidden="true"
        ></i>
      </Button>
    </React.Fragment>
  );
};

export default BidBox;
