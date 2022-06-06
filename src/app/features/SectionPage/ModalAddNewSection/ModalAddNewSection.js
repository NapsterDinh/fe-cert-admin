import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import { addNewSection } from "app/core/apis/section";
import React, { useEffect, useState } from "react";
import { openNotificationWithIcon } from "app/base/components/Notification";

const ModalAddNewSection = ({ show, handleClose, getAllSection }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const handleSaveSection = async (e) => {
    e.preventDefault();
    const section = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      status: e.target.status[0].checked ? "public" : "private",
    };

    try {
      const response = await addNewSection(section);

      if (response.status === 201) {
        await getAllSection();
        handleClose();
        openNotificationWithIcon("success", "Create section successfully");
      }
    } catch (error) {}
    //call API
  };

  useEffect(() => {
    setSlug(generatorSlug(title.trim()));
  }, [title]);

  const generatorSlug = (title) => {
    if (title === "") {
      return "";
    } else {
      return "/section/" + title?.toLowerCase().replaceAll(" ", "-");
    }
  };

  return (
    <>
      <Modal
        backdrop={`static`}
        show={show}
        onHide={() => {
          setDescription("");
          setSlug("");
          setTitle("");
          handleClose();
        }}
        className="modal-lecture"
      >
        <Form onSubmit={handleSaveSection}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group
                className={"form-group mb-3"}
                as={Col}
                controlId="formTitle"
              >
                <Form.Label>Title</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    name="title"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
              <div>
                <Form.Group
                  className={"form-group mb-3"}
                  as={Col}
                  controlId="formTitle"
                >
                  <Form.Label>Slug</Form.Label>
                  <InputGroup>
                    <Form.Control
                      value={slug}
                      readOnly
                      placeholder="Enter slug"
                      name="slug"
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <Form.Group
                className={"form-group error mb-3"}
                controlId="formDescription"
              >
                <Form.Label>Description</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    as="textarea"
                    rows={5}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                className={"form-group mb-3 d-flex"}
                as={Col}
                controlId="formTitle"
              >
                <div>
                  <Form.Label>Status</Form.Label>
                  <div key={`inline-radio-status`} className="mb-3">
                    <Form.Check
                      inline
                      label="public"
                      name="status"
                      defaultChecked
                      type="radio"
                      id={`inline-radio-3`}
                    />
                    <Form.Check
                      inline
                      name="status"
                      label="private"
                      type="radio"
                      id={`inline-radio-4`}
                    />
                  </div>
                </div>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setDescription("");
                setSlug("");
                setTitle("");
                handleClose();
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddNewSection;
