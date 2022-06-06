import React from "react";
import { Modal, Button, Form } from "@themesberg/react-bootstrap";
import "./ModalAddSection.css";

const ModalAddSection = ({ show, handleClose, handleSubmit, idSection }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-question">
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              Confirm cancel{" "}
              {idSection === undefined ? `add section` : `edit section`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre style={{ whiteSpace: "pre-line", fontSize: "20px" }}>
              Are you sure to cancel{" "}
              {idSection === undefined
                ? `create a new section`
                : `edit section`}{" "}
              ?
            </pre>
            <pre style={{ whiteSpace: "pre-line", fontSize: "20px" }}>
              This modified changes will not saved and you can't rollback
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSection;
