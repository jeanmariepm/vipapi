import bridgeApi from "../bridgeApi";
import Deal from "../../bridge/deal";
import auth from "../auth";

test("saveDeal", async () => {
  auth.login("jeanmar", "jean1234", () => {
    console.log("Logged in");
  });
  while (!auth.getCurrentUser()) await new Promise((r) => setTimeout(r, 1000));
  console.log("Logged in as ", auth.getCurrentUser());

  let deal = new Deal();
  let bids = ["P", "P", "P", "P"];
  deal = JSON.stringify(deal.hands);
  bids = JSON.stringify(bids);
  console.log(deal);

  let savedDeal;
  bridgeApi.saveDeal(deal, bids, (result) => {
    console.log("Deal saved:", result);
    savedDeal = result;
  });
  await new Promise((r) => setTimeout(r, 1000));
  expect(savedDeal).toBeDefined();
});

test("getDeals", async () => {
  auth.login("jeanmar", "jean1234", () => {
    console.log("Logged in");
  });
  while (!auth.getCurrentUser()) await new Promise((r) => setTimeout(r, 1000));
  console.log("Logged in as ", auth.getCurrentUser());

  let fetchedDeals;
  bridgeApi.getDeals((result) => {
    fetchedDeals = result;
    console.log("Test: got deals:", fetchedDeals);
  });
  while (!fetchedDeals) await new Promise((r) => setTimeout(r, 1000));
  expect(fetchedDeals.length).toBeGreaterThan(0);
  const deal = fetchedDeals[0];
  console.log("First dael:", deal, typeof deal);

  const hands = JSON.parse(deal.hands);
  console.log("First dael parsed:", hands, typeof hands);
});
