import React from "react";
import { Card, Table } from "react-bootstrap";
import _ from "lodash";

const showBids = (dealer, bids) => {
  for (let b = 0; b < dealer; b++) bids = ["", ...bids];
  bids = [...bids, "?"];
  return (
    <tbody>
      {bids.map((row, idx) => {
        return (
          <React.Fragment>
            {idx % 4 === 0 && (
              <tr key={idx}>
                {_.slice(bids, idx, idx + 4).map((bid, cidx) => {
                  return <td key={cidx}>{bid}</td>;
                })}
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};
const Auction = ({ dealer, bids }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Subtitle>Dealer:{dealer}</Card.Subtitle>
        <Card.Text>
          <Table
            variant="light"
            bordered
            size="sm"
            className="table-responsive"
            style={{ fontSize: "small" }}
          >
            <thead>
              <tr>
                <th>W</th>
                <th>N</th>
                <th>E</th>
                <th>S</th>
              </tr>
            </thead>
            {showBids(dealer, bids)}
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Auction;
