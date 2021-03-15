import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import SuitImage from "./gifs/suitImage";

const Hand = ({ cards, name }) => {
  const styles = {
    fontFamily: ["Courier New", "Courier", "monospace"],
    textAlign: "left",
    fontWeight: "bolder",
    fontSize: "large",
    maxHeight: "fit-content",
    maxWidth: 100,
  };
  const suits = ["S", "H", "D", "C"];

  return (
    <Card>
      <Card.Body>
        <Card.Subtitle>{name}</Card.Subtitle>
        {suits.map((suit) => {
          return (
            <Row key={suit}>
              <Col sm={4}>
                <SuitImage suit={suit} />{" "}
              </Col>
              <Col sm={40}>
                <div style={styles}>{cards[suit]}</div>
              </Col>
            </Row>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default Hand;
