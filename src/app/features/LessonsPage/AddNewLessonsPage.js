import React, { useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Breadcrumb,
  Button,
  ButtonGroup,
  Form,
  Card,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAngleDoubleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Routes } from "app/routes";
import JoditEditor from "jodit-react";

const AddNewLessonPage = ({ placeholder }) => {
  const location = useLocation();
  const history = useHistory();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => history.push("/lessons-management")}
            >
              {Routes.LessonsPage.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                const pathname = location.pathname;
                history.push(pathname.replace("/add", ""));
              }}
            >
              Create new a new lesson
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Create a new lesson</h4>
          <p className="mb-0">
            Below is an editor which you can create content of tutorial
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Save
          </Button>
          <Button variant="outline-primary" size="sm">
            Cancel
          </Button>
        </div>
      </div>
      <Row>
        <Col lg={9}>
          <Form.Group className="mb-3" controlId="tutorialTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              maxLength={130}
              minLength={20}
              type="text"
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tutorialSlug">
            <Form.Label>Slug</Form.Label>
            <Form.Control type="text" placeholder="Slug" />
          </Form.Group>
          <Form.Label>Body</Form.Label>
          <JoditEditor
            ref={editor}
            value={content}
            config={{
              minHeight: 400,
              readonly: false,
            }}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <Form.Group className="mb-3 mt-3" controlId="tutorialDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter description" />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Card className="mt-4" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text>
                Status: <span>Done</span>
              </Card.Text>
              <Card.Text>
                Date Created: <span>ngaynaodo</span>
              </Card.Text>
              <Card.Text>
                Last date changed: <span>ngaynaodo</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddNewLessonPage;
