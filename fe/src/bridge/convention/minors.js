const getOpening = (agent) => {
  if (
    agent.hcp >= 12 ||
    (agent.hcp >= 10 &&
      agent.longestLength + agent.secondLength + agent.hcp >= 20)
  ) {
    if (agent.diamondLength === 4 && agent.clubLength === 5 && agent.hcp <= 15)
      return "1D";
    return agent.diamondLength >= 4 && agent.diamondLength >= agent.clubLength
      ? "1D"
      : "1C";
  }
  return "";
};

const getOvercall = (bids, biddingContext, agent) => {};

const getResponse = (bids, biddingContext, agent) => {
  const rhoBid = bids[bids.length - 1];
  const rhoLevel = rhoBid.match(/^\d/);
  const rhoSuit = rhoLevel ? rhoBid.charAt(1) : null;
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

  let majorsToBid = [],
    majorToBid = null;
  if (!biddingContext.oppSuits.has("H"))
    if (heartLength >= 4) majorsToBid.push("H");
  if (!biddingContext.oppSuits.has("S"))
    if (spadeLength >= 4) majorsToBid.push("S");

  if (majorsToBid.length === 2) {
    majorToBid =
      spadeLength > heartLength
        ? "S"
        : spadeLength === heartLength && spadeLength > 4
        ? "S"
        : "H";
  } else if (majorsToBid.length === 1) {
    majorToBid = majorsToBid[0];
  }

  if (agent.hcp < 5) return "P";
  if (majorToBid) {
    if (rhoBid === "P" && bidLevel === 1 && agent.hcp >= 6)
      return bidLevel + majorToBid;
    if (
      (rhoSuit && bidLevel === 1 && agent.hcp >= 8) ||
      (bidLevel === 2 && agent.hcp >= 10) ||
      (bidLevel === 3 && agent.hcp >= 12)
    ) {
      if (majorToBid === "S" && spadeLength >= 5) return bidLevel + majorToBid;
      if (majorToBid === "H" && heartLength >= 5) return bidLevel + majorToBid;
      if (majorsToBid.length === 2 && spadeLength === 4) return "X";
      if (bidLevel === 1 && majorToBid === "H" && heartLength === 4)
        return "1H";
      if (
        bidLevel === 1 &&
        rhoSuit === "H" &&
        majorToBid === "S" &&
        heartLength === 4
      )
        return "X";
    }
  }

  let haveStoppers = true;
  for (let suit of biddingContext.oppSuits) {
    if (!suit === "T") if (!agent.haveStopper(suit)) haveStoppers = false;
  }

  if (rhoBid === "P" && bidLevel === 1 && agent.hcp <= 10) {
    if (haveStoppers && agent.shape === "B" && agent.hcp >= 8) return "1T";
    if (longestSuit === "D" && pdSuit !== "D") return "1D";
    if (fit) return "3" + pdSuit;
    return "1T";
  }
  if (rhoBid === "P" && bidLevel <= 2 && agent.hcp >= 11) {
    if (haveStoppers && agent.shape === "B") return "2T";
    if (fit && bidLevel === 1) return "2" + pdSuit;
    if (longestLength >= 5) {
      return bidLevel === 1 ? "1" + longestSuit : "2" + longestSuit;
    }
  }
  if (rhoBid === "X" && agent.hcp >= 11) return "XX";
};

const Minors = { getOpening, getOvercall, getResponse };

export default Minors;
