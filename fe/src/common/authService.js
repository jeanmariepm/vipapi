import jwtDecode from "jwt-decode";
import http from "./httpService";
import axios from "axios";

const apiUrl =
  window.location.port === "1234"
    ? window.location.protocol + "//" + window.location.hostname + ":8000"
    : window.location.origin;
const tokenKey = "token";

http.setJwt(getJwt());

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

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("jwt", jwtDecode(jwt));
    return jwtDecode(jwt).username;
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
