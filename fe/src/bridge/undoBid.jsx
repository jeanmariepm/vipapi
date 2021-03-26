import React from "react";
import { Button } from "react-bootstrap";

const UndoBid = ({ onUndoBid }) => {
  return (
    <Button variant="secondary" size="sm" onClick={onUndoBid}>
      Undo last bid
    </Button>
  );
};

export default UndoBid;
