import Deal from "../deal";

test("create a deal", () => {
  expect(Deal.shuffle().length).toBe(4);
});
