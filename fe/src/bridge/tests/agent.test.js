import Deal from "../deal";
import Agent from "../agent";

test("create an agent", () => {
  const hands = [
    { S: "KT74", H: "K52", D: "AQ6", C: "AJ5" },
    { S: "KJ965", H: "84", D: "AKQ95", C: "9" },
    { S: "Q8", H: "AKQ93", D: "J842", C: "T3" },
    { S: "A", H: "JT76", D: "T7", C: "KQ8763" },
    { S: "A", H: "JT76", D: "KQ8763", C: "T7" },
    { S: "KQ3", H: "AKQ93", D: "A5", C: "AJ5" },
  ];

  let agent = new Agent(hands[0]);
  //agent.print();
  expect(agent.hcp).toBe(17);
  expect(agent.getBid()).toBe("1N");

  agent = new Agent(hands[1]);
  expect(agent.ltc).toBe(5);
  expect(agent.getBid()).toBe("1S");

  agent = new Agent(hands[2]);
  expect(agent.getBid()).toBe("1H");

  agent = new Agent(hands[3]);
  expect(agent.getBid()).toBe("1C");

  agent = new Agent(hands[4]);
  expect(agent.getBid()).toBe("2D");

  agent = new Agent(hands[5]);
  expect(agent.getBid()).toBe("2C");
});
