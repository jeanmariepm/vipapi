import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const DealControl = ({ saveDeal, nextDeal }) => {
  const onSaveDeal = () => {
    saveDeal();
  };
  const onNextDeal = () => {
    nextDeal();
  };

  const showNextPane = () => {
    return (
      <Row>
        <Col sm={4}>
          <Button variant="link" size="sm" onClick={onNextDeal}>
            <i
              className="fa fa-arrow-right"
              title="Next deal"
              aria-hidden="true"
            ></i>
          </Button>
        </Col>

        <Col sm={4}>
          <Button variant="link" size="sm" onClick={onSaveDeal}>
            <i className="fa fa-save" title="Save deal" aria-hidden="true"></i>
          </Button>
        </Col>
      </Row>
    );
  };
  return <React.Fragment>{showNextPane()}</React.Fragment>;
};

export default DealControl;
