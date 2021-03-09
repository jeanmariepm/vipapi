import Deal from "../deal";

test("create hands", () => {
  const deal = new Deal();
  expect(deal.hands.length).toBe(4);
});
