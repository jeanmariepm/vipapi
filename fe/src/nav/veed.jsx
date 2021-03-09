import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Menu from "./menu";

const Veed = (props) => {
  return (
    <BrowserRouter>
      <Container>
        <ToastContainer />
        <Menu />
      </Container>
    </BrowserRouter>
  );
};

export default Veed;
