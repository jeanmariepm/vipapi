import Deal from "../deal";
import _ from "lodash";

test("create hands", () => {
  const deal = new Deal();
  expect(deal.hands.length).toBe(4);
  const cards = deal.getHand("South");
  expect(_.size(cards)).toBe(4);
});
