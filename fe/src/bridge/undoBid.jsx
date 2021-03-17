import React from "react";
import { Button } from "react-bootstrap";

const UndoBid = ({ onUndoBid }) => {
  return (
    <Button variant="link" size="sm" onClick={onUndoBid}>
      <i className="fa fa-undo" title="Undo last bid" aria-hidden="true"></i>
    </Button>
  );
};

export default UndoBid;
