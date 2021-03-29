import bridgeApi from "../bridgeApi";
import Deal from "../../bridge/deal";
import auth from "../auth";

test("saveDeal", async () => {
  auth.login("jeanmar", "jean1234", () => {
    console.log("Logged in");
  });
  while (!auth.getCurrentUser()) await new Promise((r) => setTimeout(r, 1000));
  console.log("Logged in as ", auth.getCurrentUser());

  const deal = new Deal();
  const bids = ["P", "P", "P", "P"];

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
  });
  await new Promise((r) => setTimeout(r, 1000));
  expect(fetchedDeals).toBeDefined();
});
