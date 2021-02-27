import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: "Pass",
    };
  }

  onSelect = (event) => {
    console.log("Bid sekected:", event.target.value);
    this.setState({
      bid: event.target.value,
    });
  };
  getPicks = () => {
    let picks = [];
    for (let level = 1; level <= 7; level++)
      ["C", "D", "H", "S", "NT"].forEach((suit) =>
        picks.push(`${level}${suit}`)
      );
    return picks;
  };

  handleOk = () => {
    console.log("Final bid = ", this.state.bid);
    this.props.onBid(this.state.bid);
  };

  render() {
    let options = ["Pass"];
    if (this.props.double) options.push("Dbl");
    if (this.props.redouble) options.push("RDbl");

    return (
      <React.Fragment>
        <select onChange={this.onSelect} className="selectpicker btn-success ">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
          {this.getPicks().map((pick) => (
            <option key={pick}>{pick}</option>
          ))}
        </select>
        <button onClick={this.handleOk} className="btn-link ml-6">
          <i
            className="fa fa-paper-plane"
            title="Place bid"
            aria-hidden="true"
          ></i>
        </button>
      </React.Fragment>
    );
  }
}

export default BidControls;
