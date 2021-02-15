import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Menu from "./src/nav/menu";

class App extends Component {
  render = () => {
    return (
      <div className="container">
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("App"));
