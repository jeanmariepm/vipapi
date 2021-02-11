import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Menu from "./components/menu";
import styles from "./index.css";
import { Container, Tabs, Tab, Navbar } from "react-bootstrap";

class App extends Component {
  render = () => {
    console.log("username", _username_);
    return (
      <Container>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Container>
    );
  };

  handleSelect = (selectedIndex, e) => {
    console.log(`handleSelect ${e}`);
    this.setState((state) => {
      current_index: selectedIndex;
    });
  };
}

ReactDOM.render(<App />, document.getElementById("App"));
