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
    if (agent.hcp >= 17) return "X";
    if (level + agent.longestSuit > level + suit)
      return level + agent.longestSuit;
    return level + 1 + agent.longestSuit;
  } else if (
    !oppSuits.has(agent.secondSuit) &&
    agent.goodToOvercall(agent.secondSuit)
  ) {
    if (agent.hcp >= 17) return "X";
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

  console.log("Fit?:", fit);

  if (agent.hcp < 5) return "P";
  console.log(pdRole, agent.ltc);
  if (fit) {
    if (pdRole === "Opener") {
      if (agent.ltc <= 9)
        aiBid = agent.ltc <= 7 ? "4" + pdSuit : 11 - agent.ltc + pdSuit;
      if (agent.ltc === 10) aiBid = "2" + pdSuit;
      if (aiBid > bidLevel + bidSuit) return aiBid;
      else return "X";
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

const getOpenerRebid = (bids, biddingContext, agent) => {
  const rhoBid = bids[bids.length - 1];
  const openingBid = bids[bids.length - 4];
  const openingSuit = openingBid.charAt(1);

  const pdBid = bids[bids.length - 2];
  const pdLevel = pdBid.charAt(0) - "0";
  const pdSuit = pdBid.charAt(1);
  const {
    secondSuit,
    secondLength,
    spadeLength,
    heartLength,
    diamondLength,
    clubLength,
  } = agent;
  let aiBid = "";

  if (rhoBid !== "P") return aiBid;

  if (pdLevel === 2 && pdSuit < openingSuit) {
    // 2 over 1 GF
    if (pdBid === "2H" && heartLength >= 3) return "3H";
    aiBid =
      openingSuit === "H" && heartLength >= 6
        ? "2H"
        : openingSuit === "S" && spadeLength >= 6
        ? "2S"
        : "";
    if (aiBid) return aiBid;
    if (secondLength >= 4)
      return secondSuit > pdSuit && secondSuit < openingSuit
        ? "2" + secondSuit
        : "3" + secondSuit;
    return "2T";
  }
  if (["1T", "1S"].includes(pdBid)) {
    if (pdSuit === "1S") {
      if (spadeLength >= 4) {
        let raiseLevel = 9 - agent.ltc;
        raiseLevel = raiseLevel > 4 ? 4 : raiseLevel < 2 ? 2 : raiseLevel;
        return raiseLevel + "S";
      }
      if (agent.shape === "B" && agent.hcp <= 17) return "1T";
    }
    if (agent.shape === "B" && agent.hcp <= 13) return "P";
    aiBid =
      openingSuit === "H" && heartLength >= 6
        ? "2H"
        : openingSuit === "S" && spadeLength >= 6
        ? "2S"
        : "";
    if (aiBid) return agent.hcp <= 17 ? aiBid : "3" + openingSuit;
    if (secondLength >= 4 && secondSuit < openingSuit)
      return agent.hcp <= 17 ? "2" + secondSuit : "3" + secondSuit;
    if (secondLength >= 4 && secondSuit === "S" && agent.hcp >= 17) return "2S";
    if (clubLength >= 2) return "2C";
    return "2D";
  }

  return aiBid;
};

const Majors = { getOpening, getOvercall, getResponse, getOpenerRebid };

export default Majors;
