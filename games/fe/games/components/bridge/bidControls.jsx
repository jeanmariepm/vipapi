import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "Pass",
    };
  }

  onSelect = (event) => {
    console.log(event.target.value);
    this.setState({
      selectedOption: event.target.value,
    });
  };

  showOption = (selection) => {
    return (
      <td>
        <Form.Check
          type="radio"
          inline
          name="bid"
          checked={this.state.selectedOption === selection}
          value={selection}
          label={selection}
          key={selection}
          onClick={(event) => this.onSelect(event)}
        />
      </td>
    );
  };

  showPicks = () => {
    console.log("showPicks:", this.state.selectedOption);

    if (this.state.selectedOption === "Pick")
      return (
        <tr>
          <td>
            <Form.Control as="select">
              {[1, 2, 3, 4, 5, 6, 7].map((number) => {
                return <option key={number}>{number}</option>;
              })}
            </Form.Control>
          </td>
          <td>
            <Form.Control as="select">
              {["C", "D", "H", "S", "NT"].map((suit) => {
                return <option key={suit}>{suit}</option>;
              })}
            </Form.Control>
          </td>
        </tr>
      );
  };

  render() {
    return (
      <Card bg="secondary">
        <Card.Body>
          <Form>
            <table>
              <tbody>
                <tr>
                  {["Pick", "Pass"].map((selection) => {
                    return this.showOption(selection);
                  })}
                </tr>
                <tr>
                  {["Dbl", "RDbl"].map((selection) => {
                    return this.showOption(selection);
                  })}
                </tr>
                {this.showPicks()}
                <tr>
                  <td>
                    <Button
                      variant="primary"
                      type="submit"
                      size="sm"
                      className="mb-2"
                    >
                      OK
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default BidControls;
