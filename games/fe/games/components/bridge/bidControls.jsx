import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "Pass",
      bidNumber: "1",
      bidSuit: "C",
    };
  }

  onSelect = (event) => {
    console.log(event.target.value);
    this.setState({
      selectedOption: event.target.value,
    });
  };
  onNumberSelect = (event) => {
    console.log(event.target.value);
    this.setState({
      bidNumber: event.target.value,
    });
  };
  onSuitSelect = (event) => {
    console.log(event.target.value);
    this.setState({
      bidSuit: event.target.value,
    });
  };

  showOption = (selection) => {
    return (
      <Form.Check
        type="radio"
        inline
        name="bid"
        checked={this.state.selectedOption === selection}
        value={selection}
        label={selection}
        key={selection}
        onChange={(event) => this.onSelect(event)}
      />
    );
  };

  showPicks = () => {
    if (this.state.selectedOption === "Pick")
      return (
        <React.Fragment>
          <Form.Control as="select" onChange={this.onNumberSelect}>
            {[1, 2, 3, 4, 5, 6, 7].map((number) => {
              return <option key={number}>{number}</option>;
            })}
          </Form.Control>
          <Form.Control as="select" onChange={this.onSuitSelect}>
            {["C", "D", "H", "S", "NT"].map((suit) => {
              return <option key={suit}>{suit}</option>;
            })}
          </Form.Control>
        </React.Fragment>
      );
  };

  handleOk = () => {
    console.log("handleOk");

    let bid;
    if (this.state.selectedOption === "Pick") {
      bid = `${this.state.bidNumber}${this.state.bidSuit}`;
    } else {
      bid = this.state.selectedOption;
    }
    console.log("Final bid = ", bid);
    this.props.onBid(bid);
  };

  render() {
    let options = ["Pick", "Pass"];
    if (this.props.double) options.push("Dbl");
    if (this.props.redouble) options.push("RDbl");

    return (
      <Form>
        {options.map((selection) => {
          return this.showOption(selection);
        })}
        {this.showPicks()}
        <Button key="okbtn" variant="link" size="sm" onClick={this.handleOk}>
          OK
        </Button>
      </Form>
    );
  }
}

export default BidControls;
