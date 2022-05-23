import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, Col } from "@themesberg/react-bootstrap";
import { addNewTopic } from "app/core/apis/topic";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { getQuestionById } from "app/core/apis/topic";

export const ModalModule = ({
  handleClose,
  show,
  getAllTopic,
  currentTopic,
}) => {
  const ref = useRef(null);
  const [data, setData] = useState("");
  const handleAddNewTopic = async (e) => {
    e.preventDefault();
    const topic = {
      title: e.target.title.value.trim(),
      slug: e.target.slug.value.trim(),
      description: e.target.content.value.trim(),
      objectivesTopic: e.target.objectivesTopic.value.trim().split(`\n`),
      sections: [],
      status: e.target.status[0].checked ? "Public" : "Private",
    };
    await addNewTopic(topic);
    await getAllTopic();
    openNotificationWithIcon("success", "Create a new topic successfully");
    handleClose();
  };

  const generatorSlug = (value) => {
    return value.toLowerCase().replaceAll(" ", "-");
  };

  useEffect(() => {
    if (currentTopic !== "") {
      (async () => {
        try {
          const response = await getQuestionById(currentTopic);
          setData(response?.data?.topic[0]);
        } catch (error) {}
      })();
    }
  }, [currentTopic]);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-module">
        <Form onSubmit={handleAddNewTopic}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new topic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" as={Col} controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                defaultValue={data?.title}
                onChange={(e) =>
                  (ref.current.value =
                    "/" + generatorSlug(e.target.value.trim()))
                }
                type="text"
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formSlug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                name="slug"
                defaultValue={data?.slug}
                ref={ref}
                disabled
                type="text"
                placeholder="Enter slug"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} controlId="formTitle">
              <Form.Label>Content</Form.Label>
              <Form.Control
                name="content"
                defaultValue={data?.description}
                as="textarea"
                rows={3}
                placeholder="Enter content"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} controlId="formTitle">
              <Form.Label>What student will learn ?</Form.Label>
              <Form.Control
                name="objectivesTopic"
                defaultValue={() => {
                  let str = "";
                  data?.objectivesTopic?.map((item, index) => {
                    if (index !== 0) {
                      str.concat(item + `\n`)
                    }
                  });
                  return str
                }}
                as="textarea"
                rows={6}
                placeholder="Enter what student will learn"
              />
            </Form.Group>
            <span>
              If you need enter many objectives, you need to press Enter in the
              final of sentence.
            </span>
            <Form.Group className="mb-3 mt-3" as={Col} controlId="formTitle">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  defaultChecked={data === "" || data?.status === "Public"}
                  label="Public"
                  name="status"
                  type={`radio`}
                />
                <Form.Check
                  inline
                  defaultChecked={data !== "" && data?.status !== "Public"}
                  label="Private"
                  name="status"
                  type={`radio`}
                />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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

export const ModalTutorial = ({ handleClose, show }) => {
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
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
              />
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
};
