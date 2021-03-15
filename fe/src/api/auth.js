import jwtDecode from "jwt-decode";
import http from "./http";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : window.location.origin;
const tokenKey = "token";
let loggedInUserName = null;

const login = async (username, password, callback) => {
  const loginURL = apiUrl + "/login/";
  try {
    const { data: result } = await http.post(loginURL, {
      username,
      password,
    });
    console.log("jwt", jwtDecode(result.token));

    localStorage.setItem(tokenKey, result.token);
    loggedInUserName = username;
    callback();
  } catch (ex) {
    console.log("Login failure!", ex);
    toast("Login failed. Please try again");
  }
};
const signup = async (username, password, callback) => {
  const signupURL = apiUrl + "/signup/";
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

const getCurrentUser = () => {
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
};

const auth = {
  login,
  signup,
  logout,
  getCurrentUser,
};

export default auth;
