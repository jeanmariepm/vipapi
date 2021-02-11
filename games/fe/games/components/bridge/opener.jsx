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
      bidding: true,
    };
  }

  componentDidMount() {
    console.log("Opeber did mount");
  }

  onBid = (bid) => {
    console.log("Setting bid:", bid);
    this.setState({ bid, bidding: false });
  };
  undoBid = () => {
    console.log("Undoing bid:");
    this.setState({ bid: null, bidding: true });
  };

  handleSave = () => {
    console.log("Save deals = ", this.state.deals);
  };
  rmDeal = () => {
    this.setState({
      deal: null,
      bid: null,
      bidding: false,
    });
  };
  startOver = () => {
    console.log("Starting next deal");
    const { bid, deal } = this.state;

    const deals = [...this.state.deals];
    if (bid) {
      deals.push({ deal, bid });
    }
    this.setState({
      deal: new Deal().shuffle(),
      bid: null,
      deals,
      bidding: true,
    });
  };

  getBidController = (idx) => {
    let bid;
    if (idx === -1) bid = this.state.bid;
    else bid = this.state.deals[idx]["bid"];
    console.log("Bid is currently ", bid);
    let bidElement;
    if (idx === -1)
      if (this.state.bidding)
        bidElement = (
          <React.Fragment>
            <BidControls double={false} redouble={false} onBid={this.onBid} />
            <Button variant="link" size="sm" onClick={this.rmDeal}>
              <i className="fa fa-minus" aria-hidden="true"></i>{" "}
            </Button>
          </React.Fragment>
        );
      else {
        bidElement = (
          <React.Fragment>
            {bid}
            <Button variant="link" size="sm" onClick={this.undoBid}>
              <i className="fa fa-undo" aria-hidden="true"></i>{" "}
            </Button>
            <Button variant="link" size="sm" onClick={this.rmDeal}>
              <i className="fa fa-minus" aria-hidden="true"></i>{" "}
            </Button>
          </React.Fragment>
        );
      }
    else {
      bidElement = <React.Fragment>{bid}</React.Fragment>;
    }
    return bidElement;
  };

  showNextActions = () => {
    if (!this.state.bidding)
      return (
        <React.Fragment>
          <Button variant="link" size="sm" onClick={this.startOver}>
            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
          </Button>
          <button onClick={this.handleSave} className="btn-link ml-6">
            <i className="fa fa-save" aria-hidden="true"></i>{" "}
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
            {this.state.deal ? (
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
            ) : (
              ""
            )}
          </tbody>
        </Table>
        {this.showNextActions()}
      </React.Fragment>
    );
  }
}

export default Opener;
