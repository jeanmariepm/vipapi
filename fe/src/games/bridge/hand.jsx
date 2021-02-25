import React, { Component } from "react";
import S from "./s.gif";
import H from "./h.gif";
import D from "./d.gif";
import C from "./c.gif";
import { Card, Image } from "react-bootstrap";
import styles from "./bridge.css";

const getSuitImage = (suit) => {
  const images = { S, H, D, C };
  return <img src={images[suit]} />;
};

const Hand = ({ reveal, display, player, name }) => {
  const renderCards = () => {
    return (
      <div className="pcard">
        {["S", "H", "D", "C"].map((suit, idx) => {
          return (
            <React.Fragment key={suit}>
              {getSuitImage(suit)}
              {player[suit]}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  const render = () => {
    if (display === "line") {
      return renderCards();
    }
    console.log("Show hand in card ", this.props);

    return (
      <Card bg="info">
        {name}
        <Card.Body>{renderCards()}</Card.Body>
      </Card>
    );
  };
  return render();
};

export default Hand;
