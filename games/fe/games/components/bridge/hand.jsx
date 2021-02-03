import React, { Component } from "react";
import Spade from "./s.gif";
import Heart from "./h.gif";
import Diamond from "./d.gif";
import Club from "./c.gif";
import { Card, Image } from "react-bootstrap";
import styles from "./bridge.css";

class Hand extends Component {
  getSuitImage(suit) {
    const images = { Spade, Heart, Diamond, Club };
    return <img src={images[suit]} />;
  }
  getSuitCards(suit) {
    if (this.props.reveal === false) return "?";

    let cards = this.props.player[suit];

    cards.sort((a, b) => {
      return b - a;
    });
    let cardString = "";
    for (let i = 0; i < cards.length; i++) {
      cardString += this.getBridgeString(cards[i]);
    }

    return cardString;
  }

  getBridgeString(ch) {
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
  }

  render() {
    let defSuit = Spade;
    return (
      <Card bg="info">
        <Card.Body>
          {this.props.name}
          {["Spade", "Heart", "Diamond", "Club"].map((suit, idx) => {
            return (
              <div key={suit} className="pcard">
                {this.getSuitImage(suit)}
                {this.getSuitCards(suit)}
              </div>
            );
          })}
        </Card.Body>
      </Card>
    );
  }
}

export default Hand;
