import jwtDecode from "jwt-decode";
import http from "./httpService";
import axios from "axios";

const apiUrl =
  window.location.port === "1234"
    ? window.location.protocol + "//" + window.location.hostname + ":8000"
    : window.location.origin;
const tokenKey = "token";
let loggedInUserName = null;

export async function login(username, password, callback) {
  console.log("Logging in, username=", username);
  const { data: result } = await axios.post(apiUrl + "/login/", {
    username,
    password,
  });
  console.log("Login complete", result);
  console.log("jwt", jwtDecode(result.token));

  localStorage.setItem(tokenKey, result.token);
  loggedInUserName = username;
  callback();
}
export async function signup(username, password, callback) {
  const { data: result } = await axios.post(apiUrl + "/login/", {
    username,
    password,
  });
  localStorage.setItem(tokenKey, result.token);
  loggedInUserName = username;
  callback();
}

export async function loginWithJwt(jwt) {
  console.log("logging in with jwt:", jwt);
  try {
    const { data: result } = await axios.post(
      apiUrl + "/refresh_token/",
      { token: jwt },
      {
        headers: { Authorization: "JWT " + jwt },
      }
    );
    console.log("logged in with jwt", result);
    if (result.token) {
      loggedInUserName = result.username;
      localStorage.setItem(tokenKey, result.token);
    } else {
      console.log("Need to login again");
      logout();
    }
  } catch (ex) {
    if (ex.response.status > 400) {
      console.error(ex.response);
      console.log("Need to login again");
      logout();
    }
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
  loggedInUserName = null;
}

export function getCurrentUser() {
  if (loggedInUserName) return loggedInUserName;
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) return null;
    console.log("jwt", jwtDecode(jwt));
    const exp = jwtDecode(jwt).exp;
    const expRolerance = 1000 * 60 * 60 * 4;
    if (exp < expRolerance) {
      console.log("Token has expired:", exp);
      loginWithJwt(jwt);
    } else {
      console.log("Token has NOT expired:", exp, "<", expRolerance);
      loggedInUserName = jwtDecode(jwt).username;
    }
    return loggedInUserName;
  } catch (ex) {
    console.log("Nothing in jwt");
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  signup,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
