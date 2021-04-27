import React from "react";
import { Card, Row, Col } from "react-bootstrap";

import _ from "lodash";

const styles = {
  fontFamily: ["Courier New", "Courier", "monospace"],
  textAlign: "center",
  fontWeight: "bolder",
  fontSize: "small",
  maxHeight: "fit-content",
  display: "inline-block",
  marginLeft: "2%",
  zoon: 1,
};
const showBids = (dealer, bids, aiBid, biddingOver) => {
  for (let b = 0; b < dealer; b++) bids = ["", ...bids];
  bids = [...bids, biddingOver ? "-" : aiBid ? "i" : "?"];

  const bidMap = {
    "": "-",
    "1T": "1NT",
    "2T": "2NT",
    "3T": "3NT",
    "4T": "4NT",
    "5T": "5NT",
    "6T": "6NT",
    "7T": "7NT",
  };
  aiBid = bidMap[aiBid] || aiBid;

  return (
    <React.Fragment>
      {bids.map((row, idx) => {
        return (
          <div key={idx}>
            {idx % 4 === 0 && (
              <Row key={idx}>
                {_.slice(bids, idx, idx + 4).map((bid, cidx) => {
                  return (
                    <Col key={cidx} style={{ maxWidth: 3 }}>
                      {bid === "i" ? (
                        <i
                          className="fa fa-info"
                          title={aiBid}
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <div style={styles}>{bidMap[bid] || bid}</div>
                      )}
                    </Col>
                  );
                })}
              </Row>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};

const Auction = ({ title, dealer, bids, aiBid, biddingOver }) => {
  console.log(aiBid);
  return (
    <Card>
      <Card.Body>
        <Row>{title}</Row>

        <Row>
          {["W", "N", "E", "S"].map((p, idx) => {
            return (
              <Col key={idx} style={{ maxWidth: 3 }}>
                <div style={styles}>{p}</div>
              </Col>
            );
          })}
        </Row>
        {showBids(dealer, bids, aiBid, biddingOver)}
      </Card.Body>
    </Card>
  );
};

export default Auction;
