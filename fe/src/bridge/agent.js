import _ from "lodash";
import NT from "./convention/NT";
import Minors from "./convention/minors";
import Majors from "./convention/majors";

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
    this.spadeLength = this.distribution[0];
    this.heartLength = this.distribution[1];
    this.diamondLength = this.distribution[2];
    this.clubLength = this.distribution[3];
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
  goodToOvercall(suit) {
    const cards = this.hand[suit];
    let topCards = 0;
    if (cards.search("A") >= 0) topCards++;
    if (cards.search("K") >= 0) topCards++;
    if (cards.search("Q") >= 0) topCards++;
    if (cards.search("J") >= 0 && cards.search("T") >= 0) topCards++;
    return cards.length >= 5 && topCards >= 2;
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

  getBidderRoles(bids) {
    let bidderRole, pdRole;

    if (bids.length === 0) bidderRole = "Opener";
    else if (bids.length === 1) {
      bidderRole = bids[0] === "P" ? "Opener" : "Overcaller";
    }
    if (bidderRole) return [bidderRole, pdRole];

    console.assert(bids.length > 1);

    [pdRole] = this.getBidderRoles(bids.slice(0, bids.length - 2));
    if (pdRole === "Opener" || pdRole === "Overcaller") {
      bidderRole =
        bids[bids.length - 2] === "P"
          ? bids[bids.length - 1] === "P"
            ? pdRole
            : "Overcaller"
          : pdRole === "Opener"
          ? "Responder"
          : "Advancer";
    } else if (pdRole === "Responder" || pdRole === "Advancer") {
      bidderRole = "Rebidder";
    }
    return [bidderRole, pdRole];
  }

  getBiddingContext(bids) {
    const [gb, goingBid, dblRdbl] = this.getGoingBid(bids);
    const [pgb, priorGoingBid, priorDblRdbl] = goingBid
      ? this.getGoingBid(bids.slice(0, gb))
      : [-1, "", ""];
    const biddingContext = {
      bidderRole: null,
      pdRole: null,
      oppSuits: null,
      goingBid,
      priorGoingBid,
      dblRdbl,
      priorDblRdbl,
    };

    console.assert(pgb >= -1);
    const [bidderRole, pdRole] = this.getBidderRoles(bids);
    biddingContext.bidderRole = bidderRole;
    biddingContext.pdRole = pdRole;
    biddingContext.oppSuits = this.getOppSuits(bids);

    return biddingContext;
  }

  getOppSuits(bids) {
    let suits = new Set();
    for (let i = bids.length - 1; i >= 0; i = i - 2) {
      if (bids[i].match(/^\d/)) suits.add(bids[i].charAt(1));
    }
    return suits;
  }

  getBid(bids = []) {
    let aiBid = "";
    const bc = this.getBiddingContext(bids);
    console.log(bc);
    if (bc.bidderRole === "Opener") aiBid = this.getOpeningBid();
    if (bc.bidderRole === "Overcaller") aiBid = this.getOvercall(bids, bc);
    if (bc.bidderRole === "Responder" || bc.bidderRole === "Advancer")
      aiBid = this.getResponse(bids, bc);
    if (bc.bidderRole === "OpenerRebid") aiBid = this.getOpenerRebid(bids, bc);
    console.log("aiBud:", aiBid);
    return aiBid;
  }
  getOpeningBid() {
    let aiBid = "";

    aiBid = NT.getOpening(this);
    if (!aiBid) aiBid = this.get2CBid();
    if (!aiBid) aiBid = Majors.getOpening(this);
    if (!aiBid) aiBid = Minors.getOpening(this);
    if (!aiBid) aiBid = this.getPreemptBid();
    if (!aiBid) aiBid = "P";
    // this.print();
    // console.log("Major?", aiBid);

    return aiBid;
  }

  getOvercall(bids, bc) {
    let aiBid = "";
    const suit = bc.goingBid.charAt(1);
    const level = bc.goingBid.charAt(0) - "0";
    if (this.hcp >= 18 + 2 * (level - 1)) return "X";

    aiBid = NT.getOvercall(bids, bc, this);
    if (!aiBid) aiBid = Majors.getOvercall(bids, bc, this); // handles minors as well
    if (!aiBid) aiBid = this.getTODouble(level, suit, bc.oppSuits);
    if (!aiBid) aiBid = this.getPreemptOvercall(level, bc.oppSuitssuit);
    if (!aiBid) aiBid = "P";
    return aiBid;
  }
  getResponse(bids, bc) {
    console.log("getResponse");
    let aiBid = "";
    const openingBid = bids[bids.length - 2];
    const suit = openingBid.charAt(1);
    if (suit === "T") aiBid = NT.getResponse(bids, bc, this);
    console.log("done getResponse NT:", aiBid);

    if (!aiBid && ["S", "H"].includes(suit)) {
      console.log("getting Major response to ", openingBid);
      aiBid = Majors.getResponse(bids, bc, this);
      console.log("done getResponse Major:", aiBid);
    }

    if (!aiBid && ["D", "C"].includes(suit)) {
      aiBid = Minors.getResponse(bids, bc, this);
      console.log("done getResponse Minors:", aiBid);
    }

    return aiBid;
  }
  getOpenerRebid(bids, bc) {
    let aiBid = "";

    return aiBid;
  }

  get2CBid = () => {
    if (this.hcp >= 21) return "2C";
    return "";
  };

  getPreemptBid = () => {
    if (this.ltc >= 9) return "";
    if (this.longestLength < 6) return "";

    if (this.longestLength === 6) {
      return this.spadeLength === 6
        ? "2S"
        : this.heartLength === 6
        ? "2H"
        : this.diamondLength === 6
        ? "2D"
        : "P";
    }
    if (this.longestLength > 6) {
      const suit =
        this.spadeLength > 6
          ? "S"
          : this.heartLength > 6
          ? "H"
          : this.diamondLength > 6
          ? "D"
          : "C";
      let level = 11 - this.ltc;
      if (level > 4) level = 4;
      return level + suit;
    }
    return "";
  };

  suitMap = { 0: "S", 1: "H", 2: "D", 3: "C" };

  getTODouble(level, suit, oppSuits) {
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
  getPreemptOvercall(level, suit, oppSuits) {
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
    if (!aiBid) if (bid.charAt(1) === "2") aiBid = this.getWeak2Response(bid);

    return aiBid;
  }

  getIntResponseBid(bid, rhoBid) {
    return "";
  }

  getMajorResponse(bid) {
    /*     //const level = bid.charAt(0);
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
    return "P"; */
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
