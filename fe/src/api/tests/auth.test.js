import _ from "lodash";
import auth from "../auth";

test("login", async () => {
  auth.login("jeanmar", "jean1234", () => {
    console.log("Logged in");
  });
  await new Promise((r) => setTimeout(r, 1000));
  expect(auth.getCurrentUser()).toBe("jeanmar");
});

test("logout", () => {
  auth.logout(() => {
    console.log("logged out");
  });
  expect(auth.getCurrentUser()).toBeFalsy();
});

test("signup", async () => {
  const userName = "test" + Math.floor(Math.random() * 1000);
  auth.signup(userName, "test1234", () => {
    console.log("Signed up");
  });
  await new Promise((r) => setTimeout(r, 1000));
  expect(auth.getCurrentUser()).toBe(userName);
});
