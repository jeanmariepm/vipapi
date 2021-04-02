import React from "react";
import { Container } from "react-bootstrap";
import { MemoryRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Menu from "./menu";

const Veed = (props) => {
  return (
    <MemoryRouter>
      <Container>
        <ToastContainer />
        <Route component={Menu} />
      </Container>
    </MemoryRouter>
  );
};

export default Veed;
