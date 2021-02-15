import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styles from "./tictactoe.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      handler: props.onClick,
      index: props.index,
    };
  }

  getDisabled() {
    const value = this.getValue();
    return value === null ? false : true;
  }
  getValue() {
    return this.state.game.squares[this.state.index];
  }

  render() {
    return (
      <Button
        className="Square"
        disabled={this.getDisabled()}
        onClick={() => this.state.handler()}
      >
        {this.getValue()}
      </Button>
    );
  }
}
export default Square;
