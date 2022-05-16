import React, { useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import { Modal, Button, Form, Col } from "@themesberg/react-bootstrap";

export const ModalModule = ({handleClose, show}) => {
    const editor = useRef(null)
	const [content, setContent] = useState('')
    return (
        <>
        <Modal show={show} onHide={handleClose} className="modal-module">
            <Form>
                <Modal.Header closeButton>
                <Modal.Title>Create a new Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <Form.Group className="mb-3" as={Col} controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} controlId="formSlug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control type="text" placeholder="Enter slug" />
                    </Form.Group>

                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={
                            {
                                minHeight: 400,
                                minWidth: 800,
                                readonly: false
                            }
                        }
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {}}
                    />
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}

export const ModalTutorial = ({handleClose, show}) => {
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                <Modal.Title>View tutorial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" as={Col} controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} controlId="formSlug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control type="text" placeholder="Enter slug" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter description" />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}


 