import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import { addNewQuestion, editQuestion } from "app/core/apis/question";
import React, { useState, useEffect } from "react";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { getAllTopic } from "app/core/apis/topic";
import { Select } from "antd";
import Editor from "app/base/components/Editor/Editor";
import "./ModalNewQuestion.css";
const { Option } = Select;

const ModalAddNewQuestion = ({
  show,
  handleClose,
  item,
  setItem,
  fetchQuestionList,
}) => {
  const [topic, setTopic] = useState([]);
  const [selectedTopicID, setSelectedTopicID] = useState("");
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  useEffect(() => {
    if (item !== "") {
      setQuestion(item.question);
      setExplanation(item.explanation);
    } else {
      setQuestion("");
      setExplanation("");
    }
  }, [item]);

  const handleAddNewQuestion = async (e) => {
    e.preventDefault();
    const tempItem = item;
    setItem("");
    const type = "single_choice";
    let choices = [];
    let answer = "";

    if (tempItem?.question !== undefined) {
      try {
        choices = tempItem.choices;
        choices = choices.map((item1, index) => {
          return {
            ...item1,
            label: e.target[`choices${index}`].value.trim(),
          };
        });

        if (e.target.answer[0].checked) {
          answer = {
            _id: choices[0]._id,
          };
        } else if (e.target.answer[1].checked) {
          answer = {
            _id: choices[1]._id,
          };
        } else if (e.target.answer[2].checked) {
          answer = {
            _id: choices[2]._id,
          };
        } else {
          answer = {
            _id: choices[3]._id,
          };
        }

        const response = await editQuestion({
          ...tempItem,
          question: question,
          explanation: explanation,
          type: type,
          choices: choices,
          answer: answer,
          topic: topic?.find((t) => t.title === selectedTopicID)._id,
        });
        if (response.status === 201) {
          await fetchQuestionList();
          handleClose();
          openNotificationWithIcon(
            "success",
            "A new question has been updated"
          );
        }
      } catch (error) {}
    } else {
      try {
        for (let index = 0; index < 4; index++) {
          choices.push({
            _id: index,
            label: e.target[`choices${index}`].value.trim(),
          });
        }

        if (e.target.answer[0].checked) {
          answer = {
            _id: 0,
          };
        } else if (e.target.answer[1].checked) {
          answer = {
            _id: 1,
          };
        } else if (e.target.answer[2].checked) {
          answer = {
            _id: 2,
          };
        } else {
          answer = {
            _id: 3,
          };
        }
        const response = await addNewQuestion({
          question: question,
          explanation: explanation,
          type: type,
          choices: choices,
          answer: answer,
          topic: topic?.find((t) => t.title === selectedTopicID)._id,
        });

        if (response.status === 201) {
          await fetchQuestionList();
          handleClose();
          openNotificationWithIcon(
            "success",
            "A new question has been created"
          );
        }
      } catch (error) {}
    }
  };

  const handleChange = (value) => {
    setSelectedTopicID(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllTopic();
        setTopic(response?.data?.topic);
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={async () => {
          await setItem("");
          handleClose();
        }}
        className="modal-question"
      >
        <Form noValidate onSubmit={handleAddNewQuestion}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={8}>
                <Form.Group
                  className={"form-group mb-3"}
                  as={Col}
                  controlId="formTitle"
                >
                  <Form.Label>Question</Form.Label>
                  <Editor
                    state={question}
                    setState={setQuestion}
                    placeholder="Enter question"
                  />
                </Form.Group>
                <Form.Group
                  className={"form-group error mb-3"}
                  controlId="formDescription"
                >
                  <Form.Label>Explanation(Optional)</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      rows={3}
                      placeholder="Enter explanation"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Label>Answer</Form.Label>
                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                  <Form.Check
                    inline
                    defaultChecked={
                      item?.choices !== undefined &&
                      item?.choices[0]._id === item?.answer
                        ? true
                        : false
                    }
                    name="answer"
                    type="radio"
                    id={`inline-1`}
                  />
                  <Form.Control
                    defaultValue={
                      item?.choices !== undefined ? item.choices[0].label : ""
                    }
                    as="textarea"
                    name="choices0"
                    rows={2}
                    placeholder="Answer A"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                  <Form.Check
                    inline
                    defaultChecked={
                      item?.choices !== undefined &&
                      item?.choices[1]._id === item?.answer
                        ? true
                        : false
                    }
                    name="answer"
                    type="radio"
                    id={`inline-2`}
                  />
                  <Form.Control
                    defaultValue={
                      item?.choices !== undefined ? item.choices[1].label : ""
                    }
                    as="textarea"
                    name="choices1"
                    rows={2}
                    placeholder="Answer B"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                  <Form.Check
                    inline
                    defaultChecked={
                      item?.choices !== undefined &&
                      item?.choices[2]._id === item?.answer
                        ? true
                        : false
                    }
                    name="answer"
                    type="radio"
                    id={`inline-3`}
                  />
                  <Form.Control
                    defaultValue={
                      item?.choices !== undefined ? item.choices[2].label : ""
                    }
                    as="textarea"
                    rows={2}
                    name="choices2"
                    placeholder="Answer C"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="formDescription">
                  <Form.Check
                    inline
                    defaultChecked={
                      item?.choices !== undefined &&
                      item?.choices[3]._id === item?.answer
                        ? true
                        : false
                    }
                    name="answer"
                    type="radio"
                    id={`inline-4`}
                  />
                  <Form.Control
                    defaultValue={
                      item?.choices !== undefined ? item.choices[3].label : ""
                    }
                    as="textarea"
                    name="choices3"
                    rows={2}
                    placeholder="Answer D"
                  />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Topic</Form.Label>
                  <Select
                    style={{ width: "300px" }}
                    defaultValue={
                      item !== "" &&
                      topic?.find((t) => t._id === item.topic)?.title
                    }
                    onChange={handleChange}
                  >
                    {topic?.map((t) => (
                      <Option key={t._id} value={t.title}>
                        {t.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={async () => {
                await setItem("");
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

export default ModalAddNewQuestion;
