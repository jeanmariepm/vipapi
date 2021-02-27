import React, { Component } from "react";
import { Table, Row, Col, Button, Card, Container } from "react-bootstrap";
import Deal from "./deal";
import Hand from "./hand";
import { paginate } from "../../common/paginate";

import BidControls from "./bidControls";
import Pagination from "../../common/pagination";
import brisgeService from "../../common/bridgeService";
import UserContext from "../../context/userContext";
import { logoutHandler } from "../../veed";

class Opener extends Component {
  static contextType = UserContext;

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
        deals[i] = {
          hands: JSON.parse(dbDeals[i].hands),
          bid: dbDeals[i].bid,
          username: dbDeals[i].username,
          ai_bid: dbDeals[i].ai_bid,
        };
      }
    console.log("Fetched deals:", deals);
    this.setState({ deals });
  };
  componentDidMount() {
    brisgeService.getDeals(this.onGetDeals);
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  onBid = (bid) => {
    this.setState({ bid, bidding: false });
  };
  undoBid = () => {
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

  onSaveDeal = (deal) => {
    console.log("onSaveDeal:", deal);
    if (!deal) {
      this.context.logoutHandler();
      return;
    }
    const deals = [...this.state.deals];
    const hands = JSON.parse(deal.hands);
    const { bid, username, ai_bid } = deal;
    deals.push({ hands, bid, username, ai_bid });

    this.setState({
      hands: Deal.shuffle(),
      bid: null,
      deals,
      bidding: true,
    });
  };
  newDeal = () => {
    console.log("Starting next deal");
    const { bid, hands } = this.state;

    if (bid) {
      brisgeService.saveDeal(hands, bid, this.onSaveDeal);
    } else {
      this.setState({
        hands: Deal.shuffle(),
        bid: null,
        bidding: true,
      });
    }
  };

  getBidController = () => {
    let bidElement;
    if (this.state.bidding)
      bidElement = (
        <React.Fragment>
          <BidControls double={false} redouble={false} onBid={this.onBid} />
          <Button variant="link" size="sm" onClick={this.rmDeal}>
            <i
              className="fa fa-minus"
              title="Forget this deal"
              aria-hidden="true"
            ></i>
          </Button>
        </React.Fragment>
      );
    else {
      bidElement = (
        <React.Fragment>
          {this.state.bid}
          <Button variant="link" size="sm" onClick={this.undoBid}>
            <i className="fa fa-undo" title="Undo bid" aria-hidden="true"></i>{" "}
          </Button>
          <Button variant="link" size="sm" onClick={this.rmDeal}>
            <i
              className="fa fa-minus"
              title="Forget this deal"
              aria-hidden="true"
            ></i>
          </Button>
        </React.Fragment>
      );
    }
    return bidElement;
  };

  showNextActions = () => {
    if (!this.state.bidding)
      return (
        <React.Fragment>
          <Button variant="link" size="sm" onClick={this.newDeal}>
            <i className="fa fa-plus" title="Save deal" aria-hidden="true"></i>{" "}
          </Button>
          <button onClick={this.handleRefresh} className="btn-link ml-6">
            <i
              className="fa fa-refresh"
              title="Refresh deals"
              aria-hidden="true"
            ></i>{" "}
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
                <td>AI's Bid</td>
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
                    <td>{pageDeals[idx].bid}</td>
                    <td> {pageDeals[idx].username}</td>
                    <td> {pageDeals[idx].ai_bid}</td>
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
          {this.getBidController()}
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
