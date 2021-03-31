import http from "./http";
import auth from "./auth";

const saveDeal = async (hands, auction, callback) => {
  const username = auth.getCurrentUser();
  if (!username) {
    console.log("Not saving deal. Need to login first");
    return;
  }

  try {
    const jwt = auth.getJwt();

    const { data: result } = await http.post(
      http.apiUrl() + "/games/api/deals/",
      {
        hands,
        auction,
        username,
      },
      {
        headers: { Authorization: "JWT " + jwt },
      }
    );
    callback(result);
  } catch (ex) {
    if (ex.response) console.log(ex.response);
    else console.log(ex.request);
    console.log("Need to login again");
    callback(null);
  }
};

export async function getDeals(callback) {
  const username = auth.getCurrentUser();
  if (!username) {
    console.log("Not saving deal. Need to login first");
    return;
  }

  try {
    const jwt = auth.getJwt();

    console.log("Fetching deals from:", http.apiUrl() + "/games/api/deals/");
    const { data: result } = await http.get(
      http.apiUrl() + "/games/api/deals/",
      {
        username,
      },
      {
        headers: { Authorization: "JWT " + jwt },
      }
    );
    console.log("Done fetching deals", result);
    callback(result);
  } catch (ex) {
    if (ex.response) console.log(ex.response);
    else if (ex.request) console.log(ex.request);
    else console.log(ex);
    console.log("Need to login again");
    callback(null);
  }
}

const bridgeApi = {
  saveDeal,
  getDeals,
};

export default bridgeApi;
