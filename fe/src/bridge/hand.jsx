import React from "react";
import { Card } from "react-bootstrap";
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
        <Card.Text>
          {suits.map((suit) => {
            return (
              <div key={suit} style={{ maxHeight: 25 }}>
                <td>
                  <SuitImage suit={suit} />
                </td>
                <td>
                  <p style={styles}>{cards[suit]}</p>
                </td>
                <br />
              </div>
            );
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Hand;
