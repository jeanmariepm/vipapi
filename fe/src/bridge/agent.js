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
  getBid() {
    return "TBD";
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
  /*
  def getNTBid(self):
  if self.handShape == "U":  # unbalaced
      return "TBD"
  if self.handShape == "B":
      # add a pt for 5-cd suit
      adjustedHcp = self.hcp + (1 if self.distribution.count(5) == 1 else 0)
  elif self.handShape == "S":
      adjustedHcp = self.hcp
  if adjustedHcp >= 15 and adjustedHcp <= 17:
      return "1NT"
  if adjustedHcp >= 20 and adjustedHcp <= 21:
      return "1NT"
  return "TBD"

def get1MajorBid(self):
  spadeLength = self.distribution[0]
  heartLength = self.distribution[1]
  if spadeLength < 5 and heartLength < 5:
      return "TBD"
  if self.hcp >= 11 and self.hcp <= 21:
      return "1S" if spadeLength >= heartLength else "1H"
  if self.hcp == 10 and self.handShape == "U":
      return "1S" if spadeLength >= heartLength else "1H"
  return "TBD"

def get1MinorBid(self):
  diamondLength = self.distribution[2]
  clubLength = self.distribution[3]
  if self.hcp >= 12 and self.hcp <= 21:
      return "1D" if diamondLength >= clubLength and diamondLength >= 4 else "1C"
  if self.hcp == 11 and (diamondLength + clubLength) >= 10:
      return "1D" if diamondLength >= clubLength else "1C"
  return "TBD"

def get2CBid(self):
  if self.hcp >= 21:
      return "2C"
  return "TBD"

def getPreemptBid(self):
  if self.ltc >= 9:
      return "TBD"
  if max(self.distribution) < 6:
      return "TBD"
  spadeLength = self.distribution[0]
  heartLength = self.distribution[1]
  diamondLength = self.distribution[2]
  clubLength = self.distribution[3]
  if max(self.distribution) == 6:
      return (
          "2S"
          if spadeLength == 6
          else "2H"
          if heartLength == 6
          else "2D"
          if diamondLength == 6
          else "TBD"
      )
  if max(self.distribution) > 6:
      suit = (
          "S"
          if spadeLength > 6
          else "H"
          if heartLength > 6
          else "D"
          if diamondLength > 6
          else "C"
      )
      level = 11 - self.ltc
      return f"{level}{suit}"
  return "TBD"

def make_bid(self):
  ai_bid = self.getNTBid()
  if ai_bid == "TBD":
      ai_bid = self.get1MajorBid()
  if ai_bid == "TBD":
      ai_bid = self.get1MinorBid()
  if ai_bid == "TBD":
      ai_bid = self.get2CBid()
  if ai_bid == "TBD":
      ai_bid = self.getPreemptBid()
  if ai_bid == "TBD":
      ai_bid = "Pass"

  return f"{ai_bid}"
*/
}

export default Agent;
