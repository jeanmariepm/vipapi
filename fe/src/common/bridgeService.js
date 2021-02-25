import http from "./httpService";
import auth from "../common/authService";
import { Callbacks } from "jquery";

const apiUrl =
  window.location.port === "1234"
    ? window.location.protocol + "//" + window.location.hostname + ":8000"
    : window.location.origin;

export async function saveDeal(hands, bid) {
  const username = auth.getCurrentUser();
  if (!username) {
    console.log("Not saving deal. Need to login first");
    return;
  }
  const jwt = auth.getJwt();

  console.log({ hands, bid, username }, jwt);
  const { data: result } = await http.post(
    apiUrl + "/games/api/deals/",
    {
      hands: JSON.stringify(hands),
      bid,
      username,
    },
    {
      headers: { Authorization: "JWT " + jwt },
    }
  );
}

export async function getDeals(callback) {
  const username = auth.getCurrentUser();

  console.log("Fetching deals from:", apiUrl + "/games/api/deals/");
  const { data: result } = await http.get(apiUrl + "/games/api/deals/", {
    username,
  });
  console.log("Done fetching deals", result);
  callback(result);
}

export default {
  saveDeal,
  getDeals,
};
