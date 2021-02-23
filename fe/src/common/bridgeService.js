import http from "./httpService";

const apiUrl = "http://localhost:8000";

export async function saveDeal(hands, bid) {
  console.log({ hands, bid });
  const { data: result } = await http.post(apiUrl + "/games/api/deals/", {
    hands,
    bid,
  });
}

export default {
  saveDeal,
};
