import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import "./TableQuestion.css";

export const TablesQuestion = ({ data, title, handleShow }) => {
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <div style={{ height: 632, width: "100%" }}>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TablesQuestion;
