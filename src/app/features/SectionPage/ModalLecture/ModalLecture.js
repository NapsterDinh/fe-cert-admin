import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import Editor from "app/base/components/Editor/Editor";
import "./ModalLecture.css";
import { addNewLesson, editLesson } from "app/core/apis/lessons";
import { openNotificationWithIcon } from "app/base/components/Notification";

const ModalLecture = ({
  show,
  handleClose,
  handleSubmit,
  selectedLecture,
  lectures,
  setLectures,
  idSection,
  fetchSectionByID,
}) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    if (selectedLecture !== "") {
      //call API
    } else {
      setData("");
    }
  }, [selectedLecture]);

  useEffect(() => {
    setSlug(generatorSlug(title.trim()));
  }, [title]);

  const generatorSlug = (title) => {
    if (title === "") {
      return "";
    } else {
      return "#" + title?.toLowerCase().replaceAll(" ", "-");
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    let temp = [...lectures];

    try {
      let response = "";
      if (selectedLecture === "") {
        response = await addNewLesson({
          title: title,
          slug: slug,
          body: body,
          tableOfContent: generatorTablesContent(body)[0],
          status: e.target.status[0].checked ? "public" : "private",
          sectionId: idSection,
        });
        if (response.status === 201) {
          await fetchSectionByID();
          handleClose();
          openNotificationWithIcon("success", "Create lectures successfully");
        }
      } else {
        const index = lectures.findIndex((item) => item.id === selectedLecture);
        response = await editLesson({
          ...lectures[index],
          title: title,
          slug: slug,
          body: body,
          tableOfContent: generatorTablesContent(body)[0],
          status: e.target.status[0].checked ? "public" : "private",
          sectionId: idSection,
        });
        if (response.status === 200) {
          await fetchSectionByID();
          handleClose();
          openNotificationWithIcon("success", "Update lectures successfully");
        }
      }
    } catch (error) {}
  };

  const generatorTablesContent = (value) => {
    const strCloseH2 = value.split(`</h2>`);
    let temp = [];
    strCloseH2.map((item) => {
      const indexH2 = item.indexOf(`<h2>`);
      if (indexH2 !== -1) {
        const spanStr = document.createElement("span");
        spanStr.innerHTML = item.substring(indexH2 + 4);
        temp.push(spanStr.textContent || spanStr.innerText);
      }
    });
    return [
      temp,
      value
        .split(`</h2>`)
        .map((item2, index) => {
          return item2.replace(`<h2>`, `<h2 id="${temp[index]}">`);
        })
        .join(),
    ];
  };

  return (
    <>
      <Modal
        backdrop={`static`}
        show={show}
        onHide={handleClose}
        className="modal-lecture"
      >
        <Form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedLecture !== "" ? "Edit Lecture" : "Add new Lecture"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={9} className="col-left">
                <Form.Group className="mb-3" controlId="tutorialTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    maxLength={130}
                    value={title}
                    required
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter title"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tutorialSlug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    value={slug}
                    type="text"
                    readOnly
                    placeholder="Slug"
                  />
                </Form.Group>
                <Form.Label>Body</Form.Label>
                <br></br>
                <span>
                  Note*: Use SubHeading if you want to make table of content
                </span>
                <Editor
                  state={body}
                  setState={setBody}
                  placeholder={"Enter body of lecture"}
                />
              </Col>
              <Col lg={3}>
                <Card className="mt-4">
                  <Card.Body>
                    <Form.Group
                      className={"form-group mb-3 d-flex"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <div>
                        <Form.Label>Status</Form.Label>
                        <div key={`inline-radio-status`} className="mb-3">
                          {data?.status !== undefined &&
                          data?.status === "public" ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              <Form.Check
                                inline
                                label="public"
                                name="status"
                                type="radio"
                                id={`inline-radio-3`}
                              />
                              <Form.Check
                                inline
                                defaultChecked
                                name="status"
                                label="private"
                                type="radio"
                                id={`inline-radio-4`}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Form.Group>
                    {selectedLecture !== "" && (
                      <Card.Text>
                        Date Created:{" "}
                        <span>
                          {data?.dateCreated !== undefined
                            ? data.dateCreated
                            : ""}
                        </span>
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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

export default ModalLecture;
