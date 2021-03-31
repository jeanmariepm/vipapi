import React from "react";
import { Button } from "react-bootstrap";
import UndoBid from "./undoBid";
import auth from "../api/auth";

const DealControl = ({
  undoBid,
  saveDeal,
  nextDeal,
  doneDeal,
  practiceMode,
}) => {
  const showNextPane = () => {
    return (
      <React.Fragment>
        <UndoBid onUndoBid={undoBid} />
        {practiceMode ? (
          <React.Fragment>
            <Button variant="success" size="sm" onClick={nextDeal}>
              Next Deal
            </Button>
            <Button
              variant="warning"
              size="sm"
              disabled={!auth.getCurrentUser()}
              onClick={saveDeal}
            >
              {!auth.getCurrentUser() ? "Login to Save" : "Save to Review"}
            </Button>
          </React.Fragment>
        ) : (
          <Button variant="success" size="sm" onClick={doneDeal}>
            Done
          </Button>
        )}
      </React.Fragment>
    );
  };
  return <React.Fragment>{showNextPane()}</React.Fragment>;
};

export default DealControl;
