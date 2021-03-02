import { object } from "prop-types";
import brisgeService from "../../common/bridgeService";
class Deal {
  static shuffle() {
    let cards = [];
    for (let i = 0; i < 52; i++) {
      cards[i] = i;
    }
    let card;
    let deal = [];

    for (let j = 0; j < 4; j++) {
      let player = { S: [], H: [], D: [], C: [] };
      for (let k = 0; k < 13; k++) {
        card = cards[Math.floor(Math.random() * cards.length)];
        cards.splice(cards.indexOf(card), 1);
        if (card < 13) player["S"].push(card);
        else if (card < 26) player["H"].push(card);
        else if (card < 39) player["D"].push(card);
        else if (card < 52) player["C"].push(card);
      }
      deal.push(player);
    }

    return Deal.getBridgeDeal(deal);
  }

  static getBridgeDeal(deal) {
    let bridgeDeal = [];
    for (let j = 0; j < 4; j++) {
      bridgeDeal[j] = { S: [], H: [], D: [], C: [] };
      ["S", "H", "D", "C"].map((suit) => {
        bridgeDeal[j][suit] = deal[j][suit].sort((a, b) => {
          return b - a;
        });
        let cardString = "";
        for (let i = 0; i < bridgeDeal[j][suit].length; i++) {
          cardString += Deal.getBridgeChar(bridgeDeal[j][suit][i]);
        }
        bridgeDeal[j][suit] = cardString;
      });
    }
    return bridgeDeal;
  }

  static getBridgeChar(ch) {
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
}

export default Deal;
