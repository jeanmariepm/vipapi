import React, { Component } from "react";
import Spade from "./s.gif";
import Heart from "./h.gif";
import Diamond from "./d.gif";
import Club from "./c.gif";
import { Table } from "react-bootstrap";
import styles from "./bridge.css";

class Hand extends Component {
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
    return (
      <Table size="sm">
        <tbody>
          <tr height>
            <td>
              <div className="pcard">
                <img src={Spade} />
                {this.getSuitCards("S")}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pcard">
                <img src={Heart} />
                {this.getSuitCards("H")}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pcard">
                <img src={Diamond} />
                {this.getSuitCards("D")}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pcard">
                <img src={Club} />
                {this.getSuitCards("C")}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default Hand;
