import React, { Component } from "react";
import Deal from "./deal";
import Hand from "./hand";
import { Table } from "react-bootstrap";

class Bridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: new Deal(),
    };
  }

  render() {
    const player = "South";
    const cards = this.state.deal.getHand(player);
    return (
      <Table>
        <tbody>
          <tr>
            <td>
              <Hand cards={cards} name={player} />
            </td>
            <td>Auction</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default Bridge;
