import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class DealControls extends Component {
  render() {
    return (
      <Card bg="secondary">
        <Card.Body>
          <Button variant="link" size="sm" onClick={this.props.startOver}>
            Re-deal
          </Button>
          <br />
          <Button variant="link" size="sm" onClick={this.props.show}>
            {this.props.reveal ? "Hide" : "Show"}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default DealControls;
