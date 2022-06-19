import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import EditorToolbar, {
  formats,
  modules,
} from "app/base/components/Editor/EditorToolbar";
import ReactQuill from "react-quill";
import { Select, message } from "antd";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { getAllSection } from "app/core/apis/section";
import { getAllLesson } from "app/core/apis/lessons";
import {
  addNewQuestionWithExam,
  editQuestion,
  getQuestionById as getQuestionByIDQuestion,
} from "app/core/apis/question";
import { getAllTopic } from "app/core/apis/topic";
import React, { useEffect, useState } from "react";
import "./ModalNewQuestion.css";

const { Option } = Select;

const ModalAddNewQuestion = ({
  show,
  handleClose,
  item,
  setItem,
  fetchQuestionList,
  examId,
  topic,
}) => {
  const [section, setSection] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedTopicID, setSelectedTopicID] = useState("");
  const [selectedSectionID, setSelectedSectionID] = useState("");
  const [selectedLessonID, setSelectedLessonID] = useState("");
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      if (item !== "") {
        console.log(item);
        setQuestion(item.question);
        setExplanation(window.atob(item.explanation));
        setChoices(item.choices);
        setAnswer(item.answer);
        setSelectedTopicID(topic?.find((t) => t.title === item.topic)._id);
        setSelectedSectionID(item.section);
        setSelectedLessonID(item.lesson);
        setData(item);
      } else {
        setQuestion("");
        setExplanation("");
        setChoices([]);
        setAnswer("");
        setSelectedTopicID("");
        setSelectedSectionID("");
        setSelectedLessonID("");
        setData("");
      }
    })();
  }, [item]);

  const handleAddNewQuestion = async (e) => {
    e.preventDefault();
    const type = "single_choice";
    if (item !== "") {
      try {
        let temp_answer = "";
        let temp_choices = [...choices];
        temp_choices = temp_choices.map((item1, index) => {
          return {
            ...item1,
            label: e.target[`choices${index}`].value.trim(),
          };
        });

        if (e.target.answer[0].checked) {
          temp_answer = {
            _id: choices[0]._id,
          };
        } else if (e.target.answer[1].checked) {
          temp_answer = {
            _id: choices[1]._id,
          };
        } else if (e.target.answer[2].checked) {
          temp_answer = {
            _id: choices[2]._id,
          };
        } else {
          temp_answer = {
            _id: choices[3]._id,
          };
        }
        const response = await editQuestion({
          ...data,
          question: window.btoa(unescape(encodeURIComponent(question))),
          explanation: window.btoa(unescape(encodeURIComponent(explanation))),
          type: type,
          choices: temp_choices,
          answer: temp_answer,
          topic: selectedTopicID,
          section: selectedSectionID,
          lesson: selectedLessonID,
        });
        if (response.status === 201) {
          await fetchQuestionList();
          handleClose();
          openNotificationWithIcon(
            "success",
            "A new question has been updated"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        for (let index = 0; index < 4; index++) {
          choices.push({
            _id: index,
            label: e.target[`choices${index}`].value.trim(),
          });
        }

        let temp_answer = "";
        if (e.target.answer[0].checked) {
          temp_answer = {
            _id: 0,
          };
        } else if (e.target.answer[1].checked) {
          temp_answer = {
            _id: 1,
          };
        } else if (e.target.answer[2].checked) {
          temp_answer = {
            _id: 2,
          };
        } else {
          temp_answer = {
            _id: 3,
          };
        }
        const response = await addNewQuestionWithExam({
          examId: examId,
          question: window.btoa(unescape(encodeURIComponent(question))),
          explanation: window.btoa(unescape(encodeURIComponent(explanation))),
          type: type,
          choices: choices,
          answer: temp_answer,
          topic: selectedTopicID,
          section: selectedSectionID,
          lesson: selectedLessonID,
        });
        setItem("");

        if (response.status === 201) {
          await fetchQuestionList();
          handleClose();
          openNotificationWithIcon(
            "success",
            "A new question has been created"
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        await setItem("");
        handleClose();
        setQuestion("");
        setExplanation("");
        setChoices([]);
        setAnswer("");
        setSelectedTopicID("");
        setData("");
      }
    }
  };

  const handleChange = (value) => {
    setSelectedTopicID(value);
    setSelectedSectionID("");
    setSelectedLessonID("");
  };

  useEffect(() => {
    if (selectedTopicID !== "") {
      setSection(topic?.find((item) => item._id === selectedTopicID)?.sections);
    }
  }, [selectedTopicID]);

  useEffect(() => {
    if (selectedSectionID !== "") {
      setLessons(
        section?.find((item) => item._id === selectedSectionID)?.lessons
      );
    }
  }, [selectedSectionID]);

  const handleChangeSection = (value) => {
    setSelectedSectionID(value);
  };

  const handleChangeLesson = (value) => {
    setSelectedLessonID(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const response1 = await getAllSection();

        setSection(response1?.data?.topicSection);
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={async () => {
          await setItem("");
          setQuestion("");
          setExplanation("");
          setChoices([]);
          setAnswer("");
          setSelectedTopicID("");
          setSelectedSectionID("");
          setSelectedLessonID("");
          setData("");
          handleClose();
        }}
        className="modal-question"
      >
        <Form noValidate onSubmit={handleAddNewQuestion}>
          <Modal.Header closeButton>
            <Modal.Title>
              {item !== "" ? "Edit Question" : "Add New Question"}
            </Modal.Title>
          </Modal.Header>
          {item !== "" && selectedTopicID && (
            <Modal.Body>
              <Row>
                <Col lg={8}>
                  <Form.Label>Question</Form.Label>
                  <div className="toolbar-add-question">
                    <EditorToolbar />
                    <ReactQuill
                      theme="snow"
                      modules={{
                        ...modules,
                        toolbar: ".toolbar-add-question",
                      }}
                      formats={formats}
                      value={question}
                      onChange={setQuestion}
                      placeholder="Enter question"
                    />
                  </div>
                  <Form.Label>Explanation(Optional)</Form.Label>
                  <div className="toolbar-add-explanation">
                    <EditorToolbar />
                    <ReactQuill
                      theme="snow"
                      modules={{
                        ...modules,
                        toolbar: ".toolbar-add-explanation",
                      }}
                      formats={formats}
                      value={explanation}
                      onChange={setExplanation}
                      placeholder="Enter question"
                    />
                  </div>
                  <Form.Label>Answer</Form.Label>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[0]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-1`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[0]?.label : ""
                      }
                      as="textarea"
                      name="choices0"
                      rows={3}
                      placeholder="Answer A"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[1]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-2`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[1]?.label : ""
                      }
                      as="textarea"
                      name="choices1"
                      rows={3}
                      placeholder="Answer B"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[2]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-3`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[2]?.label : ""
                      }
                      as="textarea"
                      rows={3}
                      name="choices2"
                      placeholder="Answer C"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[3]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-4`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[3]?.label : ""
                      }
                      as="textarea"
                      name="choices3"
                      rows={3}
                      placeholder="Answer D"
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Topic</Form.Label>
                    <Select
                      style={{ width: "300px" }}
                      value={selectedTopicID}
                      onChange={handleChange}
                    >
                      {topic?.map((t) => (
                        <Option key={t._id} value={t._id}>
                          {t.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Section</Form.Label>
                    <Select
                      style={{ width: "300px" }}
                      value={selectedSectionID}
                      onChange={handleChangeSection}
                    >
                      {section?.map((t) => (
                        <Option key={t._id} value={t._id}>
                          {t.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Lessons</Form.Label>
                    <Select
                      style={{ width: "300px" }}
                      value={selectedLessonID}
                      onChange={handleChangeLesson}
                    >
                      {lessons?.map((t) => (
                        <Option key={t._id} value={t._id}>
                          {t.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
          )}
          {item === "" && (
            <Modal.Body>
              <Row>
                <Col lg={8}>
                  <Form.Label>Question</Form.Label>
                  <div className="toolbar-add-question">
                    <EditorToolbar />
                    <ReactQuill
                      theme="snow"
                      modules={{
                        ...modules,
                        toolbar: ".toolbar-add-question",
                      }}
                      formats={formats}
                      value={question}
                      onChange={setQuestion}
                      placeholder="Enter question"
                    />
                  </div>
                  <Form.Label>Explanation(Optional)</Form.Label>
                  <div className="toolbar-add-explanation">
                    <EditorToolbar />
                    <ReactQuill
                      theme="snow"
                      modules={{
                        ...modules,
                        toolbar: ".toolbar-add-explanation",
                      }}
                      formats={formats}
                      value={explanation}
                      onChange={setExplanation}
                      placeholder="Enter question"
                    />
                  </div>
                  <Form.Label>Answer</Form.Label>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[0]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-1`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[0]?.label : ""
                      }
                      as="textarea"
                      name="choices0"
                      rows={3}
                      placeholder="Answer A"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[1]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-2`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[1]?.label : ""
                      }
                      as="textarea"
                      name="choices1"
                      rows={3}
                      placeholder="Answer B"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[2]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-3`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[2]?.label : ""
                      }
                      as="textarea"
                      rows={3}
                      name="choices2"
                      placeholder="Answer C"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="formDescription"
                  >
                    <Form.Check
                      inline
                      defaultChecked={
                        choices !== undefined && choices[3]?._id === answer
                          ? true
                          : false
                      }
                      name="answer"
                      type="radio"
                      id={`inline-4`}
                    />
                    <Form.Control
                      defaultValue={
                        choices !== undefined ? choices[3]?.label : ""
                      }
                      as="textarea"
                      name="choices3"
                      rows={3}
                      placeholder="Answer D"
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="formDescriptions">
                    <Form.Label>Topic</Form.Label>
                    <Select
                      style={{ width: "300px" }}
                      defaultValue={
                        item !== "" &&
                        topic?.find((t) => t._id === selectedTopicID)?._id
                      }
                      onChange={handleChange}
                    >
                      {topic?.map((t) => (
                        <Option key={t._id} value={t._id}>
                          {t.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Section</Form.Label>
                    <Select
                      style={{ width: "300px" }}
                      defaultValue={
                        item !== "" &&
                        section?.find((t) => t._id === selectedSectionID)?._id
                      }
                      onChange={handleChangeSection}
                    >
                      {section?.map((t) => (
                        <Option key={t._id} value={t._id}>
                          {t.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Lessons</Form.Label>
                    <Select
                      style={{ width: "300px" }}
                      defaultValue={
                        item !== "" &&
                        lessons?.find((t) => t._id === selectedLessonID)?._id
                      }
                      onChange={handleChangeLesson}
                    >
                      {lessons?.map((t) => (
                        <Option key={t._id} value={t._id}>
                          {t.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={async () => {
                await setItem("");
                handleClose();
                setQuestion("");
                setExplanation("");
                setChoices([]);
                setAnswer("");
                setSelectedTopicID("");
                setSelectedSectionID("");
                setSelectedLessonID("");
                setData("");
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

export default ModalAddNewQuestion;
