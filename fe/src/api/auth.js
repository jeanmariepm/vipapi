import jwtDecode from "jwt-decode";
import http from "./http";
import axios from "axios";
import { toast } from "react-toastify";

const tokenKey = "token";
let loggedInUserName = null;

const login = async (username, password, callback) => {
  const loginURL = http.apiUrl() + "/login/";
  try {
    const { data: result } = await http.post(loginURL, {
      username,
      password,
    });

    localStorage.setItem(tokenKey, result.token);
    loggedInUserName = username;
    callback();
  } catch (ex) {
    console.log("Login failure!", ex);
    toast("Login failed. Please try again");
  }
};
const signup = async (username, password, callback) => {
  const signupURL = http.apiUrl() + "/signup/";
  try {
    const { data: result } = await axios.post(signupURL, {
      username,
      password,
    });
    localStorage.setItem(tokenKey, result.token);
    loggedInUserName = username;
    callback();
  } catch (ex) {
    console.log("Signup failure!", ex);
    toast("Signup failed. Please try again");
  }
};

async function loginWithJwt(jwt) {
  try {
    const { data: result } = await axios.post(
      http.apiUrl() + "/refresh_token/",
      { token: jwt },
      {
        headers: { Authorization: "JWT " + jwt },
      }
    );
    if (result.token) {
      loggedInUserName = result.username;
      localStorage.setItem(tokenKey, result.token);
    } else {
      console.log("Need to login again");
    }
  } catch (ex) {
    if (ex.response.status > 400) {
      console.error(ex.response);
      console.log("Need to login again");
    }
  }
}

const logout = (callback) => {
  localStorage.removeItem(tokenKey);
  loggedInUserName = null;
  callback();
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};
const getCurrentUser = () => {
  if (loggedInUserName) return loggedInUserName;
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) return null;
    const exp = jwtDecode(jwt).exp;
    const expRolerance = 1000 * 60 * 60 * 4;
    if (exp < expRolerance) {
      loginWithJwt(jwt);
    } else {
      loggedInUserName = jwtDecode(jwt).username;
    }
    return loggedInUserName;
  } catch (ex) {
    console.log("Nothing in jwt");
    return null;
  }
};

const auth = {
  login,
  signup,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
