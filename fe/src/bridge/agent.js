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

  getBid() {
    let aiBid = "TBD";

    aiBid = this.getNTBid();

    if (aiBid === "TBD") aiBid = this.get1MajorBid();
    if (aiBid === "TBD") aiBid = this.get1MinorBid();
    if (aiBid === "TBD") aiBid = this.get2CBid();
    if (aiBid === "TBD") aiBid = this.getPreemptBid();
    if (aiBid === "TBD") aiBid = "P";

    return aiBid;
  }

  getNTBid = () => {
    if (this.handShape === "U")
      // unbalaced
      return "TBD";
    let adjustedHcp = this.hcp;
    if (this.handShape === "B") {
      // add a pt for 5-cd suit
      adjustedHcp = this.hcp + (this.distribution.count(5) === 1 ? 1 : 0);
    }
    if (adjustedHcp >= 15 && adjustedHcp <= 17) return "1T";
    if (adjustedHcp >= 20 && adjustedHcp <= 21) return "2T";
    return "TBD";
  };

  get1MajorBid = () => {
    const spadeLength = this.distribution[0];
    const heartLength = this.distribution[1];
    if (spadeLength < 5 && heartLength < 5) return "TBD";
    if (this.hcp >= 11 && this.hcp <= 21)
      return spadeLength >= heartLength ? "1S" : "1H";
    if (this.hcp === 10 && this.handShape === "U")
      return spadeLength >= heartLength ? "1S" : "1H";
    return "TBD";
  };

  get1MinorBid = () => {
    const diamondLength = this.distribution[2];
    const clubLength = this.distribution[3];
    if (this.hcp >= 12 && this.hcp <= 21)
      return diamondLength >= clubLength && diamondLength >= 4 ? "1D" : "1C";
    if (this.hcp === 11 && this.shape === "U")
      return diamondLength >= clubLength ? "1D" : "1C";
    if (this.hcp === 10 && clubLength > 5 && this.shape === "U") return "1C";
    return "TBD";
  };
  get2CBid = () => {
    if (this.hcp >= 21) return "2C";
    return "TBD";
  };

  getPreemptBid = () => {
    if (this.ltc >= 9) return "TBD";
    if (_.max(this.distribution) < 6) return "TBD";

    const spadeLength = this.distribution[0];
    const heartLength = this.distribution[1];
    const diamondLength = this.distribution[2];
    const clubLength = this.distribution[3];
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
    return "TBD";
  };

  /*



def get2CBid(self):

def getPreemptBid(self):
D"

*/
}

export default Agent;
