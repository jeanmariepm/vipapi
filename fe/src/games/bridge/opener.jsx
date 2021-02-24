import React, { Component } from "react";
import { Table, Row, Col, Button, Card, Container } from "react-bootstrap";
import Deal from "./deal";
import Hand from "./hand";
import { paginate } from "../../common/paginate";

import BidControls from "./bidControls";
import Pagination from "../../common/pagination";
import brisgeService from "../../common/bridgeService";

class Opener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      hands: null,
      bid: null,
      bidding: false,
      currentPage: 1,
      pageSize: 3,
    };
  }

  onGetDeals = (dbDeals) => {
    let deals = [];
    if (dbDeals)
      for (let i = 0; i < dbDeals.length; i++) {
        console.log("i hands", i, ":", dbDeals[i].hands);
        deals[i] = { hands: JSON.parse(dbDeals[i].hands), bid: dbDeals[i].bid };
      }
    console.log("Fetched deals:", deals);
    this.setState({ deals });
  };
  componentDidMount() {
    console.log("Opener did mount");
    brisgeService.getDeals(this.onGetDeals);
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  onBid = (bid) => {
    console.log("Setting bid:", bid);
    this.setState({ bid, bidding: false });
  };
  undoBid = () => {
    console.log("Undoing bid:");
    this.setState({ bid: null, bidding: true });
  };

  handleRefresh = () => {
    brisgeService.getDeals(this.onGetDeals);
  };

  rmDeal = () => {
    this.setState({
      hands: null,
      bid: null,
      bidding: false,
    });
  };

  newDeal = () => {
    console.log("Starting next deal");
    const { bid, hands } = this.state;

    const deals = [...this.state.deals];
    if (bid) {
      deals.push({ hands, bid });
      brisgeService.saveDeal(hands, bid);
    }
    this.setState({
      hands: Deal.shuffle(),
      bid: null,
      deals,
      bidding: true,
    });
    console.log("# of deals = ", deals.length);
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
          <Button variant="link" size="sm" onClick={this.newDeal}>
            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
          </Button>
          <button onClick={this.handleRefresh} className="btn-link ml-6">
            <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
          </button>
        </React.Fragment>
      );
  };

  getPagedDeals = () => {
    const { pageSize, currentPage, deals } = this.state;
    return paginate(deals, currentPage, pageSize);
  };

  showPageDeals = () => {
    const pageDeals = this.getPagedDeals();
    if (pageDeals && pageDeals.length > 0) {
      return (
        <React.Fragment>
          <Table>
            <thead>
              <tr>
                <td>D</td>
                <td>Vul</td>
                <td>Hand</td>
                <td>Bid</td>
                <td>By</td>
              </tr>
            </thead>
            <tbody>
              {pageDeals.map((deal, idx) => {
                return (
                  <tr key={idx}>
                    <td>N</td>
                    <td>None</td>
                    <td>
                      <Hand
                        player={pageDeals[idx]["hands"][3]}
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
            </tbody>
          </Table>
          <Pagination
            itemsCount={this.state.deals.length}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
            pageSize={this.state.pageSize}
          />
        </React.Fragment>
      );
    } else {
      console.log("No deals:", pageDeals);
    }
  };

  showCurrentDeal = () => {
    if (this.state.hands)
      return (
        <React.Fragment>
          <Hand
            player={this.state.hands[3]}
            name="South"
            display={"line"}
            reveal={true}
          />
          {this.getBidController(-1)}
        </React.Fragment>
      );
  };

  render() {
    return (
      <React.Fragment>
        {this.showPageDeals()}
        {this.showCurrentDeal()}
        <br />
        {this.showNextActions()}
      </React.Fragment>
    );
  }
}

export default Opener;
