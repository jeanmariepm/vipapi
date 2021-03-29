import React from "react";
import SuitImage from "./gifs/suitImage";

const Hand = ({ cards, name }) => {
  const suits = ["S", "H", "D", "C"];

  return (
    <React.Fragment>
      <h6>{name}</h6>
      {suits.map((suit) => {
        return (
          <h8 key={suit}>
            <SuitImage suit={suit} />
            {cards && cards[suit]}
            &nbsp;
          </h8>
        );
      })}
    </React.Fragment>
  );
};

export default Hand;
