import jwtDecode from "jwt-decode";
import http from "./httpService";
import axios from "axios";

const apiUrl =
  window.location.port === "1234"
    ? window.location.protocol + "//" + window.location.hostname + ":8000"
    : window.location.origin;
const tokenKey = "token";
let loggedIn = false;
let username = null;

export async function login(username, password, callback) {
  console.log("Logging in, username=", username);
  const { data: result } = await axios.post(apiUrl + "/token-auth/", {
    username,
    password,
  });
  console.log("Login complete", result);

  localStorage.setItem(tokenKey, result.token);
  callback();
}
export async function signup(username, password, callback) {
  const { data: result } = await axios.post(apiUrl + "/home/users/", {
    username,
    password,
  });
  localStorage.setItem(tokenKey, result.token);
  callback();
}

export async function loginWithJwt(jwt) {
  console.log("logging in with jwt:", jwt);
  try {
    const { data: result } = await axios.post(
      apiUrl + "/home/current_user/",
      { username },
      {
        headers: { Authorization: "JWT " + jwt },
      }
    );
    console.log("logged in with jwt", result.token);

    localStorage.setItem(tokenKey, result.token);
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
  username = null;
}

export function getCurrentUser() {
  if (username) return username;
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("jwt", jwtDecode(jwt));
    username = jwtDecode(jwt).username;
    //loginWithJwt(jwt);
    return username;
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
