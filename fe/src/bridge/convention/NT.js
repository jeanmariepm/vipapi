import _ from "lodash";

const getNTBid = (agent) => {
  if (agent.shape === "U")
    // unbalaced
    return "";
  let adjustedHcp = agent.hcp;
  if (agent.shape === "B") {
    // add a pt for 5-cd suit
    adjustedHcp = agent.hcp + (_.groupBy(agent.distribution)[5] === 1 ? 1 : 0);
  }
  if (adjustedHcp >= 15 && adjustedHcp <= 17) return "1T";
  if (adjustedHcp >= 20 && adjustedHcp <= 21) return "2T";
  return "";
};

const getNTOvercall = (bids, biddingContext, agent) => {
  let aiBid = "";
  for (let suit of biddingContext.oppSuits) {
    if (suit === "T") return aiBid;
    if (!agent.haveStopper(suit)) return aiBid;
  }
  aiBid = getNTBid(agent);
  const { goingBid } = biddingContext;
  const level = goingBid.charAt(0) - "0";
  aiBid = aiBid === "1T" ? (level === 1 ? "1T" : level === 2 ? "2T" : "") : "";
  return aiBid;
};
const getResponseToNT = (bids, biddingContext, agent) => {
  const rhoBid = bids[bids.length - 1];
  if (rhoBid !== "P") return ""; // yet to handle inerference
  const { goingBid } = biddingContext;
  const level = goingBid.charAt(0) - "0";

  // Jacoby
  if (agent.spadeLength >= 5 && agent.heartLength < 5) return level + 1 + "H";
  if (agent.heartLength >= 5 && agent.spadeLength < 5) return level + 1 + "D";
  if (agent.spadeLength >= 5 && agent.heartLength >= 5) {
    if (level === 1) {
      if (agent.hcp >= 8) return level + 1 + "H";
      else return level + 1 + "D";
    } else {
      if (agent.hcp >= 3) return level + 1 + "H";
      else return level + 1 + "D";
    }
  }
  // Stayman with 4-cd major
  if (agent.spadeLength === 4 || agent.heartLength === 4) {
    if (level === 1)
      if (agent.hcp >= 10 && agent.spadeLength + agent.heartLength !== 7)
        return "2C";
      else if (agent.hcp >= 8) return "2C";
    if (level === 2 && agent.hcp >= 4) return "3C";
  }

  // GF 3145 or 2155 or 3-cd major
  if (level === 1 && agent.hcp >= 10) {
    if (
      agent.spadeLength === 1 &&
      agent.heartLength === 3 &&
      agent.longestLength === 5
    )
      return "3S";
    if (
      agent.spadeLength === 3 &&
      agent.heartLength === 1 &&
      agent.longestLength === 5
    )
      return "3H";
    if (agent.spadeLength >= 3 || agent.heartLength >= 3) return "3C";
    if (agent.clubLength === 5 && agent.diamondLength === 5) return "3D";
  }

  //Size ask with an invitational hand
  if (level === 1 && 8 <= agent.hcp <= 9) return "2S";

  // Minor suit transfer
  if (level === 1 && agent.ltc <= 9) {
    if (agent.clubLength >= 6) return "2S";
    if (agent.diamondLength >= 6) return "2T";
  }

  // GF balanced
  let adjustedHcp = agent.hcp;
  if (agent.shape === "B") {
    // add a pt for 5-cd suit
    adjustedHcp = agent.hcp + agent.longestLength >= 5 ? 1 : 0;
  }
  if (level === 1) {
    if (10 <= adjustedHcp <= 15) return "3T";
    if (16 <= adjustedHcp <= 17) return "4T";
    if (18 <= adjustedHcp <= 19) return "6T";
    if (20 <= adjustedHcp <= 21) return "2S";
    if (22 <= adjustedHcp) return "7T";
  } else if (level === 2) {
    if (5 <= adjustedHcp <= 11) return "3T";
    if (12 <= adjustedHcp) return "4T";
    if (13 <= adjustedHcp <= 15) return "6T";
    if (16 <= adjustedHcp) return "4C";
    if (17 <= adjustedHcp) return "7T";
  }

  return "P";
};

const NT = { getNTBid, getNTOvercall, getResponseToNT };

export default NT;
