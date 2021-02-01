import React, { Component } from "react";
import Spade from "./s.gif";
import Heart from "./h.gif";
import Diamond from "./d.gif";
import Club from "./c.gif";
import styles from "./bridge.css";

class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: props.player,
    };
  }
  getSuitCards(suit) {
    let cards = this.state.player[suit];
    console.log("cards:", cards);

    cards.sort((a, b) => {
      return b - a;
    });
    let cardString = "";
    for (let i = 0; i < cards.length; i++) {
      console.log("card:", cards[i]);

      cards[i] = this.getBridgeString(cards[i]);
      console.log("bridgeCard:", cards[i]);
      cardString += cards[i];
    }
    console.log("Player cards as str", cardString);

    return cardString;
  }
  getBridgeString(ch) {
    const bridgeMap = {
      1: "2",
      2: "3",
      3: "4",
      4: "5",
      5: "6",
      6: "7",
      7: "8",
      8: "9",
      9: "T",
      10: "J",
      11: "Q",
      12: "K",
      0: "A",
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
