import React, { Component } from "react";
import bridgeApi from "../api/bridgeApi";
import Table from "../common/table";

class DealsTable extends Component {
  state = {
    deals: [],
  };
  componentDidMount() {
    let deals;
    bridgeApi.getDeals((result) => {
      deals = result;
      this.setState({ deals });
    });
  }

  columns = [
    {
      path: "hands",
      label: "Hands",
      /*       content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
 */
    },
    { path: "auction", label: "Auction" },
    { path: "username", label: "Saved By" },
    { path: "saved_date", label: "Saved Date and Time" },
  ];
  sortColumn = { path: "saved_date", order: "desc" };

  render() {
    console.log("DealsTable");
    if (!this.state.deals) {
      return <h3> No saved deals to review</h3>;
    }
    return (
      <Table
        columns={this.columns}
        data={this.state.deals}
        sortColumn={this.sortColumn}
        //onSort={onSort}
      />
    );
  }
}

export default DealsTable;
