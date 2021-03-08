import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Menu from "./menu";

const Veed = (props) => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Menu />
    </BrowserRouter>
  );
};

export default Veed;
