import React, { Component } from "react";
import { Table, Row, Col, Button, Card, Container } from "react-bootstrap";
import styles from "./bridge.css";
import DealControls from "./dealControls";
import BidControls from "./bidControls";
import Deal from "./deal";
import Hand from "./hand";

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
      return <div>{bid}</div>;
    }
    console.log("Idx is  ", idx);
    return <BidControls double={false} redouble={false} onBid={this.onBid} />;
  };

  render() {
    console.log("Deals in history ", this.state.deals);
    return (
      <React.Fragment>
        <Table>
          <tbody>
            {this.state.deals.map((deal, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <Hand
                      player={this.state.deals[idx]["deal"][3]}
                      name="South"
                      display={"line"}
                      reveal={true}
                    />
                  </td>
                  <td>{this.getBidController(idx)}</td>
                </tr>
              );
            })}
            <tr key="-1">
              <td>
                <Hand
                  player={this.state.deal[3]}
                  name="South"
                  display={"line"}
                  reveal={true}
                />
              </td>
              <td>{this.getBidController(-1)}</td>
            </tr>
          </tbody>
        </Table>
        <Button variant="link" size="sm" onClick={this.startOver}>
          Next Deal
        </Button>
      </React.Fragment>
    );
  }
}

export default Opener;
