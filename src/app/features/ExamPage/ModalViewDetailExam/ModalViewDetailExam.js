import React from "react";
import { Modal, Button, Form } from "@themesberg/react-bootstrap";
import "./ModalViewDetailExam.css";

const ModalViewDetailExam = ({ show, handleClose, item }) => {
  console.log(item);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-question">
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{item?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to cancel creating a new exam ? This modified changes
            will not saved and you can't rollback
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalViewDetailExam;
