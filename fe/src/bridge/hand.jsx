import React from "react";
import { Table } from "react-bootstrap";
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
    <Table borderless>
      <thead>
        <tr>
          <td style={{ maxWidth: 10 }}></td>
          <td>{name}</td>
        </tr>
      </thead>
      <tbody>
        {suits.map((suit) => {
          return (
            <tr key={suit} style={{ maxHeight: 2 }}>
              <td>
                <SuitImage suit={suit} />
              </td>
              <td>
                <p style={styles}>{cards[suit]}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Hand;
