import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import UndoBid from "./undoBid";

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
        <Row>
          <Col>
            <UndoBid onUndoBid={undoBid} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" size="sm" onClick={onNextDeal}>
              Next Deal
            </Button>
          </Col>
          <Col>
            <Button variant="link" size="sm" disabled onClick={onSaveDeal}>
              Save to Review
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  };
  return <React.Fragment>{showNextPane()}</React.Fragment>;
};

export default DealControl;
