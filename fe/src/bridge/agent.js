import _ from "lodash";

class Agent {
  constructor(hand) {
    this.hand = hand;
    this.hcp = 0;
    this.ltc = 0;
    this.shape = "";
    this.distribution = [];
    this.evaluateHand();
    const {
      longestLength,
      longestSuit,
      secondLength,
      secondSuit,
    } = this.getTwoLongest();
    this.longestLength = longestLength;
    this.longestSuit = longestSuit;
    this.secondLength = secondLength;
    this.secondSuit = secondSuit;
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

  haveStopper(suit) {
    const cards = this.hand[suit];
    if (cards.search("A") >= 0) return true;
    if (cards.search("K") >= 0 && cards.length >= 2) return true;
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

  getTwoLongest() {
    const longestLength = _.max(this.distribution);
    const longestIndex = _.indexOf(this.distribution, longestLength);
    const longestSuit = this.suitMap[longestIndex];
    const remainingDist = [...this.distribution];
    remainingDist[longestIndex] = 0;
    const secondLength = _.max(remainingDist);
    const secondIndex = _.indexOf(remainingDist, secondLength);
    const secondSuit = this.suitMap[secondIndex];
    return { longestLength, longestSuit, secondLength, secondSuit };
  }

  getGoingBid(bids) {
    let bid;
    let dblRdbl = "";
    for (let i = bids.length - 1; i >= 0; i--) {
      bid = bids[i];
      if (bid === "X" && !dblRdbl) dblRdbl = "X";
      if (bid === "XX" && !dblRdbl) dblRdbl = "XX";
      if (bid.match(/^\d/)) return [i, bid, dblRdbl];
    }
    return [-1, "", ""];
  }
  wePassed(bids) {
    let bid,
      passCount = 0;
    for (let i = bids.length - 2; i >= 0; i = i - 2) {
      bid = bids[i];
      if (bid !== "P") return -1;
      passCount++;
    }
    return passCount;
  }
  theyPassed(bids) {
    let bid,
      passCount = 0;
    for (let i = bids.length - 1; i >= 0; i = i - 2) {
      bid = bids[i];
      if (bid !== "P") return -1;
      passCount++;
    }
    return passCount;
  }

  getBiddingContext(bids) {
    const [gb, goingBid, dblRdbl] = this.getGoingBid(bids);
    const [pgb, priorGoingBid, priorDblRdbl] = goingBid
      ? this.getGoingBid(bids.slice(0, gb))
      : [-1, "", ""];
    const biddingContext = {
      bidderRole: null,
      goingBid,
      priorGoingBid,
      dblRdbl,
      priorDblRdbl,
    };

    console.assert(pgb >= -1);
    console.log(this.theyPassed(bids), this.wePassed(bids));

    if (!goingBid) biddingContext.bidderRole = "Opener";
    if (!biddingContext.bidderRole)
      if (
        this.theyPassed(bids) >= 0 &&
        bids.length >= 2 &&
        gb === bids.length - 2 &&
        this.wePassed(bids.slice(0, bids.length - 2)) >= 0
      )
        biddingContext.bidderRole = "Responder";
    if (!biddingContext.bidderRole)
      if (
        this.theyPassed(bids) >= 0 &&
        bids.length >= 4 &&
        gb === bids.length - 2 &&
        bids[bids.length - 4] !== "P" &&
        this.wePassed(bids.slice(0, bids.length - 4)) >= 0
      )
        biddingContext.bidderRole = "OpenerRebid";

    if (!biddingContext.bidderRole)
      if (this.theyPassed(bids) === -1 && this.wePassed(bids) !== -1)
        if (this.wePassed(bids) <= 3) biddingContext.bidderRole = "Overcaller";
    if (!biddingContext.bidderRole)
      if (
        this.theyPassed(bids) === -1 &&
        bids.length >= 2 &&
        bids[bids.length - 2] !== "P" &&
        this.wePassed(bids.slice(0, bids.length - 2)) >= 0
      )
        biddingContext.bidderRole = "Advancer";

    return biddingContext;
  }

  getBid(bids = []) {
    let aiBid = "";
    const bc = this.getBiddingContext(bids);
    console.log(bc);
    if (bc.bidderRole === "Opener") aiBid = this.getOpeningBid();
    if (bc.bidderRole === "Overcaller") aiBid = this.getOvercall(bc.goingBid);
    if (bc.bidderRole === "Responder") aiBid = this.getResponse(bids, bc);
    if (bc.bidderRole === "OpenerRebid") aiBid = this.getOpenerRebid(bids, bc);

    return aiBid;
  }
  getOpeningBid() {
    let aiBid = "";

    aiBid = this.getNTBid();
    if (!aiBid) aiBid = this.get2CBid();
    if (!aiBid) aiBid = this.getNTBid();
    if (!aiBid) aiBid = this.get1MajorBid();
    if (!aiBid) aiBid = this.get1MinorBid();
    if (!aiBid) aiBid = this.getPreemptBid();
    if (!aiBid) aiBid = "P";

    return aiBid;
  }

  getOvercall(bid) {
    let aiBid = "";

    const suit = bid.charAt(1);
    const level = bid.charCodeAt(0) - "0".charCodeAt(0);
    if (this.hcp >= 18 + 2 * (level - 1)) return "X";

    aiBid = this.getNTOvercall(level, suit);
    if (!aiBid) aiBid = this.getSuitOvercall(level, suit);
    if (!aiBid) aiBid = this.getTODouble(level, suit);
    if (!aiBid) aiBid = this.getPreemptOvercall(level, suit);
    if (!aiBid) aiBid = "P";
    return aiBid;
  }
  getResponse(bids, bc) {
    const rhoBid = bids[bids.length - 1];
    if (bc.goingBid === rhoBid)
      return this.getIntResponseBid(bc.priorGoingBid, bc.goingBid);
    return this.getResponseBid(bc.goingBid);
  }
  getOpenerRebid(bids, bc) {
    let aiBid = "";
    const openingBid = bids[bids.length - 2];

    return aiBid;
  }
  getNTBid = () => {
    if (this.shape === "U")
      // unbalaced
      return "";
    let adjustedHcp = this.hcp;
    if (this.shape === "B") {
      // add a pt for 5-cd suit
      adjustedHcp = this.hcp + (_.groupBy(this.distribution)[5] === 1 ? 1 : 0);
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
    if (this.hcp === 10 && this.shape === "U")
      return spadeLength >= heartLength ? "1S" : "1H";
    return "";
  };

  get1MinorBid = () => {
    const diamondLength = this.distribution[2];
    const clubLength = this.distribution[3];
    if (
      this.hcp >= 12 ||
      (this.hcp >= 10 &&
        this.longestLength + this.secondLength + this.hcp >= 20)
    )
      return diamondLength >= 4 && diamondLength >= clubLength ? "1D" : "1C";
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
      let level = 11 - this.ltc;
      if (level > 4) level = 4;
      return level + suit;
    }
    return "";
  };

  suitMap = { 0: "S", 1: "H", 2: "D", 3: "C" };
  getNTOvercall(level, suit) {
    let aiBid = "";
    if (level <= 2 && suit !== "T" && this.haveStopper(suit)) {
      aiBid = this.getNTBid();
      aiBid =
        aiBid === "1T" ? (level === 1 ? "1T" : level === 2 ? "2T" : "") : "";
    }
    return aiBid;
  }

  getSuitOvercall(level, suit) {
    //console.log("Suit overcall of ", level, suit);

    if (this.hcp < 8 + 3 * (level - 1)) return "";

    if (this.longestSuit !== suit && this.longestLength >= 5) {
      if (level + this.longestSuit > level + suit)
        return level + this.longestSuit;
      return level + 1 + this.longestSuit;
    } else if (this.secondLength >= 5) {
      if (level + this.secondSuit > level + suit)
        return level + this.secondSuit;
      return level + 1 + this.secondSuit;
    }
    return "";
  }
  getTODouble(level, suit) {
    if (this.hcp < 12) return "";
    if (suit === "T")
      if (this.getNTBid() === "1T" && level <= 2) return "X";
      else return "";

    const cards = this.hand[suit];
    const suits = ["S", "H", "D", "C"];

    if (cards.length >= 3) return "";
    for (let s in suits) {
      if (suits[s] !== suit && this.hand[suits[s]].length < 3) return "";
    }
    return "X";
  }
  getPreemptOvercall(level, suit) {
    let aiBid = this.getPreemptBid();
    if (aiBid > level + suit) return aiBid;
    return "";
  }

  getResponseBid(bid) {
    let aiBid = "";

    if (bid === "2C") aiBid = this.get2CResponse();
    if (!aiBid)
      if (bid === "1C" || bid === "1D") aiBid = this.getMinorResponse(bid);
    if (!aiBid)
      if (bid === "1H" || bid === "1S") aiBid = this.getMajorResponse(bid);
    if (!aiBid)
      if (bid === "1T" || bid === "2T") aiBid = this.getNTResponse(bid);
    if (!aiBid) if (bid.charAt(1) === "2") aiBid = this.getWeak2Response(bid);

    return aiBid;
  }

  getIntResponseBid(bid, rhoBid) {
    return "";
  }
  getMinorResponse(bid) {
    // console.log("getMinorResponse for ", bid);

    const level = bid.charAt(0);
    const suit = bid.charAt(1);
    const spadeLength = this.distribution[0];
    const heartLength = this.distribution[1];
    const diamondLength = this.distribution[2];
    const clubLength = this.distribution[3];

    if (this.hcp >= 12) {
      // GF hands
      if (this.longestLength < 5 && this.shape === "B") return "2T";

      let suitToBid = this.longestSuit;
      if (suitToBid === suit) suitToBid = this.secondSuit;
      if (suitToBid !== "C") return level + suitToBid;
      return "2C";
    } else if (this.hcp >= 6) {
      // constructive or invitational with no fit
      if (this.longestLength >= 5) {
        if (this.longestSuit === "S" || this.longestSuit === "H")
          return level + this.longestSuit;
      }
      if (heartLength === 4) return "1H";
      if (spadeLength === 4) return "1S";
      if (this.hcp >= 8 && this.hcp <= 10 && this.shape !== "U") return "1T";
      if (diamondLength >= 4 && suit !== "D") return "1D";
    } else {
      //weak shifts
      if (this.ltc <= 8 && this.longestLength === 6) {
        if (spadeLength === 6) return "2S";
        if (heartLength === 6) return "2H";
        if (diamondLength === 6 && suit !== "D") return "2D";
      } else if (this.ltc <= 8 && this.longestLength > 6) {
        if (suit !== this.longestSuit) return "3" + this.longestSuit;
      }
    }

    // constructive or better including GF with a minor fit
    const fit =
      (suit === "C" && clubLength >= 5) || (suit === "D" && diamondLength >= 4);
    if (fit) {
      if (6 <= this.hcp <= 9) return "3" + suit;
      if (this.hcp <= 10) return "2" + suit;
    }

    return "P";
  }

  getMajorResponse(bid) {
    //const level = bid.charAt(0);
    const suit = bid.charAt(1);
    const spadeLength = this.distribution[0];

    const supportLength = this.hand[suit].length;
    let dummyPoints = 0;

    if (supportLength >= 3) {
      ["S", "H", "D", "C"].forEach((s) => {
        if (suit !== s) {
          const l = this.hand[suit].length;
          dummyPoints += l === 0 ? 5 : l === 1 ? 3 : l === 2 ? 1 : 0;
        }
      });
    }
    const totalPoints = this.hcp + dummyPoints;

    if (supportLength >= 3) {
      if (totalPoints >= 12) return 4 + suit;
      if (totalPoints >= 10) return 3 + suit;
      if (totalPoints >= 7) return 2 + suit;
      if (totalPoints >= 5) return "1T";
    }
    if (this.hcp >= 12) {
      //GF hands
      if (this.longestLength >= 5)
        if (1 + this.longestSuit > bid) return 1 + this.longestSuit;
        else return 2 + this.longestSuit;
      else return "2C";
    } else if (this.hcp >= 6) {
      // not enough for 2 over 1
      if (suit === "H" && spadeLength >= 4) return "1S";
      else return "1T";
    } else {
      //weak shifts
      if (this.ltc <= 8 && this.longestLength === 6) {
        if (suit === "H" && spadeLength === 6) return "2S";
      } else if (this.ltc <= 8 && this.longestLength > 6) {
        if (suit > this.longestSuit) return "3" + this.longestSuit;
      }
    }
    return "P";
  }
  getNTResponse(bid) {
    const level = bid.charAt(0) - "0";
    const respLevel = level + 1;
    const spadeLength = this.distribution[0];
    const heartLength = this.distribution[1];
    const diamondLength = this.distribution[2];
    const clubLength = this.distribution[3];

    // Jacoby
    if (spadeLength >= 5 && heartLength < 5) return respLevel + "H";
    if (heartLength >= 5 && spadeLength < 5) return respLevel + "D";
    if (spadeLength >= 5 && heartLength >= 5)
      if (level === 1) {
        if (this.hcp >= 8) return respLevel + "H";
        else return respLevel + "D";
      } else {
        if (this.hcp >= 4) return respLevel + "H";
        else return respLevel + "D";
      }

    // Stayman with 4-cd major
    if (spadeLength >= 4 || heartLength >= 4) {
      if (level === 1 && this.hcp >= 8) return "2C";
      if (level === 2 && this.hcp >= 4) return "3C";
    }

    // GF 3145 or 2155 or 3-cd major
    if (level === 1 && this.hcp >= 10) {
      if (spadeLength === 1 && heartLength === 3 && this.longestLength === 5)
        return "3S";
      if (spadeLength === 3 && heartLength === 1 && this.longestLength === 5)
        return "3H";
      if (clubLength === 5 && diamondLength === 5) return "3D";
      if (spadeLength >= 3 || heartLength >= 3) return "3C";
    }

    //Size ask with an invitational hand
    if (level === 1 && 8 <= this.hcp <= 9) return "2S";

    // Minor suit transfer
    if (level === 1 && this.ltc <= 9) {
      if (clubLength >= 6) return "2S";
      if (diamondLength >= 6) return "2T";
    }

    // GF balanced
    let adjustedHcp = this.hcp;
    if (this.shape === "B") {
      // add a pt for 5-cd suit
      adjustedHcp = this.hcp + (_.groupBy(this.distribution)[5] === 1 ? 1 : 0);
    }
    if (level === 1) {
      if (10 <= adjustedHcp <= 15) return "3T";
      if (16 <= adjustedHcp <= 17) return "2S";
      if (18 <= adjustedHcp <= 19) return "6T";
      if (20 <= adjustedHcp <= 21) return "2S";
      if (22 <= adjustedHcp) return "7T";
    } else if (level === 2) {
      if (5 <= adjustedHcp <= 11) return "3T";
      if (12 <= adjustedHcp) return "4C";
      if (13 <= adjustedHcp <= 15) return "6T";
      if (16 <= adjustedHcp) return "4C";
      if (17 <= adjustedHcp) return "7T";
    }

    return "P";
  }

  get2CResponse() {
    if (this.hcp >= 5 && this.longestLength >= 5)
      return this.longestSuit === "C"
        ? "3C"
        : this.longestSuit === "D"
        ? "3D"
        : "2" + this.longestSuit;
    return "2D";
  }
}

export default Agent;
