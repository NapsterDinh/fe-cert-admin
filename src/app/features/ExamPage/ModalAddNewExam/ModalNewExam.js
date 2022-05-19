import React from 'react';
import { Modal, Button, Form } from "@themesberg/react-bootstrap";
import './ModalNewExam.css'

const ModalAddNewExam = ({ show, handleClose, handleSubmit }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal-question'>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm cancel add new question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure to cancel creating a new exam ?
                        This modified changes will not saved and you can't rollback
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
}

export default ModalAddNewExam;