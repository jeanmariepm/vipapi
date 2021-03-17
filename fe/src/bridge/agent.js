import _ from "lodash";

class Agent {
  constructor(hand, auction = null) {
    this.hand = hand;
    this.auction = auction;
    this.hcp = 0;
    this.ltc = 0;
    this.shape = "";
    this.distribution = [];
    this.evaluateHand();
  }
  print() {
    console.log(
      this.hand,
      `HCP: ${this.hcp} Dist:${this.distribution} LTC:${this.ltc} Shape:${this.shape}`
    );
  }
  evaluateHand() {
    for (const suit in this.hand) {
      const cards = this.hand[suit];
      this.hcp += cards.search("A") >= 0 ? 4 : 0;
      this.hcp += cards.search("K") >= 0 ? 3 : 0;
      this.hcp += cards.search("Q") >= 0 ? 2 : 0;
      this.hcp += cards.search("J") >= 0 ? 1 : 0;
      this.distribution.push(cards.length);
      let ltcCards = cards.replace("A", "").replace("K", "").replace("Q", "");
      this.ltc += Math.min(3, cards.length) - (cards.length - ltcCards.length);
    }
    const shapeLengths = _.groupBy(this.distribution);
    this.shape =
      shapeLengths[0] || shapeLengths[1]
        ? "U"
        : shapeLengths[2] && shapeLengths[2].length > 1
        ? "S"
        : "B";
  }

  getGoingBid = (bids) => {
    let bidHist = [...bids];
    let bid;
    while ((bid = bidHist.pop())) {
      if (bid.match(/^\d/)) {
        return bid;
      }
    }
    return null;
  };

  haveStopper(suit) {
    const cards = this.hand[suit];
    if (cards.charAt(0) === "A") return true;
    if (cards.charAt(0) === "K" && cards.length >= 2) return true;
    if (cards.length === 3) {
      if (
        cards.charAt(0) === "Q" &&
        (cards.charAt(1) === "J" || cards.charAt(1) === "T")
      )
        return true;
    }
    if (cards.length >= 4) return true;
    return false;
  }

  getBid(bids) {
    if (!bids) return this.getOpeningBid();
    if (!this.getGoingBid(bids)) return this.getOpeningBid();
    if (bids.length === 1) return this.getOvercall(bids[0]);
  }
  getOpeningBid() {
    let aiBid = "";

    aiBid = this.getNTBid();

    if (!aiBid) aiBid = this.get1MajorBid();
    if (!aiBid) aiBid = this.get1MinorBid();
    if (!aiBid) aiBid = this.get2CBid();
    if (!aiBid) aiBid = this.getPreemptBid();
    if (!aiBid) aiBid = "P";

    return aiBid;
  }

  getOvercall(bid) {
    let aiBid = "";
    if (this.hcp >= 18) return "X";

    const rhoSuit = bid.charAt(1);
    const rhoLevel = bid.charCodeAt(0) - "0".charCodeAt(0);
    aiBid = this.getNTOvercall(rhoLevel, rhoSuit);
    if (!aiBid) aiBid = this.getSuitOvercall(rhoLevel, rhoSuit);
    if (!aiBid) aiBid = this.getTODouble(rhoLevel, rhoSuit);
    if (!aiBid) aiBid = this.getPreemptOvercall(rhoLevel, rhoSuit);
    if (!aiBid) aiBid = "P";
    return aiBid;
  }

  getNTBid = () => {
    if (this.handShape === "U")
      // unbalaced
      return "";
    let adjustedHcp = this.hcp;
    if (this.handShape === "B") {
      // add a pt for 5-cd suit
      adjustedHcp = this.hcp + (this.distribution.count(5) === 1 ? 1 : 0);
    }
    if (adjustedHcp >= 15 && adjustedHcp <= 17) return "1T";
    if (adjustedHcp >= 20 && adjustedHcp <= 21) return "2T";
    return "";
  };

  get1MajorBid = () => {
    const spadeLength = this.distribution[0];
    const heartLength = this.distribution[1];
    if (spadeLength < 5 && heartLength < 5) return "";
    if (this.hcp >= 11 && this.hcp <= 21)
      return spadeLength >= heartLength ? "1S" : "1H";
    if (this.hcp === 10 && this.handShape === "U")
      return spadeLength >= heartLength ? "1S" : "1H";
    return "";
  };

  get1MinorBid = () => {
    const diamondLength = this.distribution[2];
    const clubLength = this.distribution[3];
    if (this.hcp >= 12 && this.hcp <= 21)
      return diamondLength >= clubLength && diamondLength >= 4 ? "1D" : "1C";
    if (this.hcp === 11 && this.shape === "U")
      return diamondLength >= clubLength ? "1D" : "1C";
    if (this.hcp === 10 && clubLength > 5 && this.shape === "U") return "1C";
    return "";
  };
  get2CBid = () => {
    if (this.hcp >= 21) return "2C";
    return "";
  };

  getPreemptBid = () => {
    if (this.ltc >= 9) return "";
    if (_.max(this.distribution) < 6) return "";

    const spadeLength = this.distribution[0];
    const heartLength = this.distribution[1];
    const diamondLength = this.distribution[2];
    // const clubLength = this.distribution[3];
    if (_.max(this.distribution) === 6) {
      return spadeLength === 6
        ? "2S"
        : heartLength === 6
        ? "2H"
        : diamondLength === 6
        ? "2D"
        : "P";
    }
    if (_.max(this.distribution) > 6) {
      const suit =
        spadeLength > 6
          ? "S"
          : heartLength > 6
          ? "H"
          : diamondLength > 6
          ? "D"
          : "C";
      const level = 11 - this.ltc;
      return level + suit;
    }
    return "";
  };

  suitMap = { 0: "S", 1: "H", 2: "D", 3: "C" };
  getNTOvercall(rhoLevel, rhoSuit) {
    let aiBid = "";
    if (rhoLevel <= 2 && this.haveStopper(rhoSuit)) {
      aiBid = this.getNTBid();
      aiBid =
        aiBid === "1T"
          ? rhoLevel === 1
            ? "1T"
            : rhoLevel === 2
            ? "2T"
            : ""
          : "";
    }
    return aiBid;
  }

  getSuitOvercall(rhoLevel, rhoSuit) {
    if (this.hcp < 9) return "";

    const longestSuitLength = _.max(this.distribution);
    if (longestSuitLength < 5) return ""; // no 5-carders
    const longestSuitIndex = _.indexOf(this.distribution, longestSuitLength);
    const longestSuit = this.suitMap[longestSuitIndex];
    if (longestSuitLength >= 5) {
      if (rhoLevel + longestSuit > rhoLevel + rhoSuit)
        return rhoLevel + longestSuit;
      return rhoLevel + 1 + longestSuit;
    }
  }
  getTODouble(rhoLevel, rhoSuit) {
    if (this.hcp < 12) return "";

    const cards = this.hand[rhoSuit];
    if (cards.length >= 3) return "";
    for (let suit in ["S", "H", "D", "C"]) {
      if (suit !== rhoSuit && this.hand[suit].length < 3) return "";
    }
    return "X";
  }
  getPreemptOvercall(rhoLevel, rhoSuit) {
    let aiBid = this.getPreemptBid();
    if (aiBid > rhoLevel + rhoSuit) return aiBid;
    return "";
  }
}

export default Agent;
