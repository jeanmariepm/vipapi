import React from "react";
import { Button } from "react-bootstrap";
import styles from "./tictactoe.css";

const Square = (props) => {
  return (
    <Button className="Square" onClick={() => props.onClick()}>
      {props.value}
    </Button>
  );
};
export default Square;
