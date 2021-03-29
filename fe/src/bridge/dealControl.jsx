import React from "react";
import { Button } from "react-bootstrap";
import UndoBid from "./undoBid";
import auth from "../api/auth";

const DealControl = ({ undoBid, saveDeal, nextDeal }) => {
  const onSaveDeal = () => {
    saveDeal();
  };
  const onNextDeal = () => {
    nextDeal();
  };

  const showNextPane = () => {
    return (
      <React.Fragment>
        <UndoBid onUndoBid={undoBid} />
        <Button variant="success" size="sm" onClick={onNextDeal}>
          Next Deal
        </Button>
        <Button
          variant="warning"
          size="sm"
          disabled={!auth.getCurrentUser()}
          onClick={onSaveDeal}
        >
          Save to Review
        </Button>
      </React.Fragment>
    );
  };
  return <React.Fragment>{showNextPane()}</React.Fragment>;
};

export default DealControl;
