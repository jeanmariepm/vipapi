import React, { Component } from "react";
import Spade from "./s.gif";
import Heart from "./h.gif";
import Diamond from "./d.gif";
import Club from "./c.gif";
import styles from "./bridge.css";

class Hand extends Component {
  getSuitCards(suit) {
    let cards = this.props.player[suit];

    cards.sort((a, b) => {
      return b - a;
    });
    let cardString = "";
    for (let i = 0; i < cards.length; i++) {
      cards[i] = this.getBridgeString(cards[i]);
      cardString += cards[i];
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
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <img src={Spade} />
            </td>
            <td className="pcard">{this.getSuitCards("S")}</td>
          </tr>
          <tr>
            <td>
              <img src={Heart} />
            </td>
            <td className="pcard">{this.getSuitCards("H")}</td>
          </tr>
          <tr>
            <td>
              <img src={Diamond} />
            </td>
            <td className="pcard">{this.getSuitCards("D")}</td>
          </tr>
          <tr>
            <td>
              <img src={Club} />
            </td>
            <td className="pcard">{this.getSuitCards("C")}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Hand;
