import React, { Component } from "react";
import Spade from "./s.gif";
import Heart from "./h.gif";
import Diamond from "./d.gif";
import Club from "./c.gif";
import { Card, Image } from "react-bootstrap";
import styles from "./bridge.css";

const getSuitImage = (suit) => {
  const images = { Spade, Heart, Diamond, Club };
  return <img src={images[suit]} />;
};
const getSuitCards = (player, suit, reveal) => {
  if (reveal === false) return "?";

  let cards = player[suit];

  cards.sort((a, b) => {
    return b - a;
  });
  let cardString = "";
  for (let i = 0; i < cards.length; i++) {
    cardString += getBridgeString(cards[i]);
  }

  return cardString;
};

const getBridgeString = (ch) => {
  const bridgeMap = {
    0: "2",
    1: "3",
    2: "4",
    3: "5",
    4: "6",
    5: "7",
    6: "8",
    7: "9",
    8: "T",
    9: "J",
    10: "Q",
    11: "K",
    12: "A",
  };
  return bridgeMap[ch % 13];
};
const Hand = ({ reveal, display, player, name }) => {
  const renderCards = () => {
    return (
      <div className="pcard">
        {["Spade", "Heart", "Diamond", "Club"].map((suit, idx) => {
          return (
            <React.Fragment key={suit}>
              {getSuitImage(suit)}
              {getSuitCards(player, suit, reveal)}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  const render = () => {
    if (display === "line") {
      console.log("Show hand in line");
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
