import _ from "lodash";

const getOpening = (agent) => {
  if (agent.spadeLength < 5 && agent.heartLength < 5) return "";
  if (_.inRange(agent.hcp, 11, 21)) {
    return agent.spadeLength >= agent.heartLength ? "1S" : "1H";
  }
  if (agent.hcp === 10 && agent.shape === "U")
    return agent.spadeLength >= agent.heartLength ? "1S" : "1H";
  return "";
};

const getOvercall = (bids, biddingContext, agent) => {
  const { goingBid, oppSuits } = biddingContext;
  const level = goingBid.charAt(0) - "0";
  const suit = goingBid.charAt(1);

  if (agent.hcp < 8 + 3 * (level - 1)) return "";

  if (
    !oppSuits.has(agent.longestSuit) &&
    agent.goodToOvercall(agent.longestSuit)
  ) {
    if (level + agent.longestSuit > level + suit)
      return level + agent.longestSuit;
    return level + 1 + agent.longestSuit;
  } else if (
    !oppSuits.has(agent.secondSuit) &&
    agent.goodToOvercall(agent.secondSuit)
  ) {
    if (level + agent.secondSuit > level + suit)
      return level + agent.secondSuit;
    return level + 1 + agent.secondSuit;
  }
  return "";
};
const getResponse = (bids, biddingContext, agent) => {
  const rhoBid = bids[bids.length - 1];
  const rhoLevel = rhoBid.match(/^\d/);
  const rhoSuit = rhoLevel ? rhoBid.charAt(1) : null;
  const { pdRole } = biddingContext;
  const pdBid = bids[bids.length - 2];
  const pdLevel = pdBid.charAt(0) - "0";
  const pdSuit = pdBid.charAt(1);
  const {
    longestSuit,
    longestLength,
    spadeLength,
    heartLength,
    diamondLength,
    clubLength,
  } = agent;
  const bidLevel = rhoSuit ? rhoLevel : pdLevel;
  const bidSuit = rhoSuit ? rhoSuit : pdSuit;
  let aiBid = "";
  const fit =
    (pdSuit === "C" && clubLength >= 5) ||
    (pdSuit === "D" && diamondLength >= 4) ||
    (pdSuit === "H" && heartLength >= 3) ||
    (pdSuit === "S" && spadeLength >= 3);

  if (agent.hcp < 5) return "P";
  if (fit) {
    console.log("Found a major fit:", pdBid);
    if (pdRole === "Opener") {
      if (agent.ltc <= 9) {
        aiBid = agent.ltc <= 7 ? "4" + pdSuit : 11 - agent.ltc + pdSuit;
        if (aiBid > bidLevel + bidSuit) return aiBid;
        else return "X";
      }
    } else {
      //pfRole === "Overcaller"
      if (agent.ltc <= 8) {
        aiBid = agent.ltc <= 6 ? "4" + pdSuit : 10 - agent.ltc + pdSuit;
        if (aiBid > bidLevel + bidSuit) return aiBid;
        else return rhoSuit ? "X" : "P";
      }
    }
  } else {
    // no major fit
    if (
      (pdRole === "Opener" && agent.hcp >= 12) ||
      (pdRole === "Overcaller" && agent.hcp >= 15)
    ) {
      // GF hands
      if (longestLength >= 5 && (!rhoSuit || rhoLevel <= 2)) {
        if (longestSuit > bidSuit) return bidLevel + longestSuit;
        return bidLevel + 1 + longestSuit;
      }
      if (rhoBid === "X") return "XX";
      if (longestSuit < 5 && !rhoSuit) return bidLevel + 1 + "C";
      if (rhoSuit && rhoLevel <= 3)
        return agent.haveStopper(rhoSuit) ? bidLevel + "T" : "X";
    } else if (agent.hcp >= 6) {
      // constructive or invitational with no fit
      aiBid = "";
      if (longestLength >= 5) {
        if (longestSuit > bidSuit) aiBid = bidLevel + longestSuit;
        if (longestSuit < bidSuit) aiBid = bidLevel + 1 + longestSuit;
        if (aiBid < "1T") return aiBid;
        if (aiBid < "2T" && agent.hcp >= 10 && longestSuit < pdSuit && rhoBid)
          return aiBid;
        if (aiBid && agent.hcp >= 8 && rhoBid) return "X";
      }
      if (bidLevel === 1) {
        if (spadeLength >= 4) return "1S" > bidLevel + bidSuit ? "1S" : "P";
        if (rhoBid === "P" || agent.hcp >= 8)
          return "1T" > bidLevel + bidSuit ? "1T" : "P";
      }
    } else return "P";
  }
};

const Majors = { getOpening, getOvercall, getResponse };

export default Majors;
