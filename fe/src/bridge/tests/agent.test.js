import Deal from "../deal";
import Agent from "../agent";

test("create an agent", () => {
  const hands = [
    { S: "KT74", H: "AK52", D: "Q6", C: "AJ5" },
    { S: "KJ965", H: "84", D: "AKQ95", C: "9" },
    { S: "Q8", H: "AKQ93", D: "J842", C: "T3" },
    { S: "A", H: "JT76", D: "T7", C: "KQ8763" },
    { S: "A", H: "JT76", D: "KQ8763", C: "T7" },
    { S: "KQ3", H: "AKQ93", D: "A5", C: "AJ5" },
    { S: "JT98764", H: "85", D: "82", C: "A2" },
    { S: "5", H: "JT76", D: "T7", C: "KQ8763" },
  ];

  let agent = new Agent(hands[0]);
  expect(agent.hcp).toBe(17);
  expect(agent.getBid()).toBe("1T");
  expect(agent.getBid(["1H"])).toBe("1T");
  expect(agent.getBid(["1D"])).toBe(""); // no stopper to bid 1T
  expect(agent.getBid(["2H"])).toBe("2T");

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
  expect(agent.getBid(["1H"])).toBe("X");

  agent = new Agent(hands[6]);
  expect(agent.getBid()).toBe("3S");

  agent = new Agent(hands[7]);
  expect(agent.getBid()).toBe("P");

  agent = new Agent(hands[6], ["P"]);
  expect(agent.getBid()).toBe("3S");
});
