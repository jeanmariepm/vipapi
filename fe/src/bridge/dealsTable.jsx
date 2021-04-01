import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import bridgeApi from "../api/bridgeApi";
import Table from "../common/table";
import Pagination from "../common/pagination";
import { paginate } from "../common/paginate";
import ListGroup from "../common/listGroup";
class DealsTable extends Component {
  state = {
    deals: [],
    users: [],
    currentPage: 1,
    pageSize: 4,
    selectedUser: null,
    sortColumn: { path: "saved_date", order: "desc" },
    begin: true, // TODO need to use reduex for this
  };

  componentDidMount() {
    if (this.state.begin) {
      let deals;
      bridgeApi.getDeals((result) => {
        deals = result;
        const users = this.getUniqueUsers(deals);
        this.setState({ deals, users, selectedUser: users[0], begin: false });
      });
    }
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleUserSelect = (user) => {
    this.setState({ selectedUser: user, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getUniqueUsers = (deals) => {
    const users = ["All users"];
    if (deals)
      deals.forEach((deal) => {
        users.push(_.get(deal, "username"));
      });
    const userObjects = [];
    [...new Set(users)].forEach((u, idx) => {
      const userObject = { id: idx, name: u };
      userObjects.push(userObject);
    });
    return userObjects;
  };

  columns = [
    {
      path: "id",
      label: "ID",
      content: (deal) => (
        <Link
          to={{
            pathname: "/bridge",
            state: {
              hands: `${deal.hands}`,
              auction: `${deal.auction}`,
            },
          }}
        >
          {deal.id}
        </Link>
      ),
    },
    { path: "hands", label: "Hands" },

    { path: "auction", label: "Auction" },
    { path: "username", label: "By" },
    { path: "saved_date", label: "At" },
  ];

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedUser,
      deals: allDeals,
    } = this.state;

    let filtered = allDeals;
    if (selectedUser && selectedUser.id !== 0)
      filtered = allDeals.filter((m) => m.username === selectedUser.name);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const deals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: deals };
  };
  render() {
    if (!this.state.deals) return <p>There are no deals in the database.</p>;
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: deals } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.users}
            selectedItem={this.state.selectedUser}
            onItemSelect={this.handleUserSelect}
          />
        </div>
        <div className="col-10">
          <Link to="/bridge" className="btn-sm btn-primary">
            New Deal
          </Link>
          {` Listing ${totalCount} saved deals`}
          <Table
            columns={this.columns}
            data={deals}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default DealsTable;
