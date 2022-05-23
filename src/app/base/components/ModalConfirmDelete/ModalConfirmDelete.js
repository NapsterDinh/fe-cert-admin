import React from 'react';
import { Modal, Button, Form } from "@themesberg/react-bootstrap";
import './ModalConfirmDelete.css'

const ModalConfirmDelete = ({ show, handleClose, handleSubmit, title, body }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal-question'>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre style={{whiteSpace: 'pre-line', fontSize: '20px'}}>
                            {body}
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
}

export default ModalConfirmDelete;