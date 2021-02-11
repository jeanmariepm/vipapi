import React, { Component } from "react";
import styles from "./addition.css";
import { Button } from "react-bootstrap";

class Addition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 1,
      num2: 1,
      response: "",
      score: 0,
      incorrect: false,
      imageURL: "https://picsum.photos/100",
    };
  }

  render() {
    if (this.state.score === 2) {
      return this.renderWinnerScreen();
    } else {
      return this.renderProblem();
    }
  }

  renderWinnerScreen() {
    return (
      <div className="app">
        <img src={this.state.imageURL} />
        <div id="winner">You won!</div>
        <Button onClick={this.startOver}>Start Over</Button>
      </div>
    );
  }

  startOver = () => {
    this.setState((state) => ({
      score: 0,
    }));
  };

  renderProblem() {
    return (
      <div className="app">
        <h1>Addition</h1>
        <div className={this.state.incorrect ? "incorrect" : ""} id="problem">
          {this.state.num1} + {this.state.num2}
        </div>
        <input
          onKeyPress={this.inputKeyPress}
          onChange={this.updateResponse}
          autoFocus={true}
          value={this.state.response}
        />
        <div>Score: {this.state.score}</div>
      </div>
    );
  }

  inputKeyPress = (event) => {
    if (event.key === "Enter") {
      const answer = parseInt(this.state.response);
      if (answer === this.state.num1 + this.state.num2) {
        // User got question right
        this.setState((state) => ({
          score: state.score + 1,
          response: "",
          num1: Math.ceil(Math.random() * 10),
          num2: Math.ceil(Math.random() * 10),
          incorrect: false,
        }));
      } else {
        // User got question wrong
        this.setState((state) => ({
          score: state.score - 1,
          incorrect: true,
          response: "",
        }));
      }
    }
  };

  updateResponse = (event) => {
    this.setState({
      response: event.target.value,
    });
  };
}

export default Addition;
