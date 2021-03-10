import React from "react";
import { Card, Table } from "react-bootstrap";

const Auction = ({ dealer }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Subtitle>Dealer:{dealer}</Card.Subtitle>
        <Card.Text>
          <Table variant="dark">
            <thead>
              <tr style={{ maxHeight: 25 }}>
                <th>W</th>
                <th>N</th>
                <th>E</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <td></td>
              <td>P</td>
              <td>P</td>
              <td>?</td>
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Auction;
