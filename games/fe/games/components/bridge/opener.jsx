import React, { Component } from "react";
import { Table, Row, Col, Button, Card, Container } from "react-bootstrap";
import styles from "./bridge.css";
import DealControls from "./dealControls";
import BidControls from "./bidControls";
import Deal from "./deal";
import Hand from "./hand";
import Like from "../common/like";

class Opener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      deal: new Deal().shuffle(),
      bid: null,
    };
  }

  componentDidMount() {
    console.log("Opeber did mount");
  }

  onBid = (bid) => {
    console.log("Setting bid:", bid);
    this.setState({ bid });
  };
  undoBid = () => {
    console.log("Undoing bid:");
    this.setState({ bid: null });
  };

  handleSave = () => {
    console.log("Save deals = ", this.state.deals);
  };

  startOver = () => {
    console.log("Starting next deal");
    const deal = new Deal().shuffle();
    const bid = this.state.bid;
    const deals = [...this.state.deals];
    deals.push({ deal, bid });
    this.setState({
      deal,
      bid: null,
      deals,
    });
  };

  getBidController = (idx) => {
    let bid;
    if (idx === -1) bid = this.state.bid;
    else bid = this.state.deals[idx]["bid"];
    console.log("Bid is currently ", bid);

    if (bid) {
      return (
        <div>
          {bid}
          {idx === -1 ? (
            <Button variant="link" size="sm" onClick={this.undoBid}>
              <i class="fa fa-undo" aria-hidden="true"></i>{" "}
            </Button>
          ) : (
            ""
          )}
        </div>
      );
    }
    console.log("Idx is  ", idx);
    return <BidControls double={false} redouble={false} onBid={this.onBid} />;
  };

  showNextActions = () => {
    if (this.state.bid)
      return (
        <React.Fragment>
          <Button variant="link" size="sm" onClick={this.startOver}>
            <i class="fa fa-plus" aria-hidden="true"></i>{" "}
          </Button>
          <button onClick={this.handleSave} className="btn-link ml-6">
            <i class="fa fa-save" aria-hidden="true"></i>{" "}
          </button>
        </React.Fragment>
      );
  };

  render() {
    console.log("Deals in history ", this.state.deals);
    return (
      <React.Fragment>
        <Table>
          <thead>
            <td>D</td>
            <td>Vul</td>
            <td>Hand</td>
            <td>Bid</td>
            <td>By</td>
          </thead>
          <tbody>
            {this.state.deals.map((deal, idx) => {
              return (
                <tr key={idx}>
                  <td>N</td>
                  <td>None</td>
                  <td>
                    <Hand
                      player={this.state.deals[idx]["deal"][3]}
                      name="South"
                      display={"line"}
                      reveal={true}
                    />
                  </td>
                  <td>{this.getBidController(idx)}</td>
                  <td></td>
                </tr>
              );
            })}
            <tr key="-1">
              <td>N</td>
              <td>None</td>
              <td>
                <Hand
                  player={this.state.deal[3]}
                  name="South"
                  display={"line"}
                  reveal={true}
                />
              </td>
              <td>{this.getBidController(-1)}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        {this.showNextActions()}
      </React.Fragment>
    );
  }
}

export default Opener;
