import {
  faAngleDoubleRight,
  faHome,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from "@themesberg/react-bootstrap";
import { openNotificationWithIcon } from "app/base/components/Notification";
//components
import TransferQuestions from "app/base/components/TransferQuestions";
import { addNewExam, editExam } from "app/core/apis/exam";
import { getAllQuestions } from "app/core/apis/question";
import { defaultExamContent } from "app/data/exam";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalAddNewExam from "../ModalAddNewExam/ModalNewExam";
import { getQuestionById } from "app/core/apis/exam";

const NewExamPage = () => {
  let { idExam } = useParams();
  const [data, setData] = useState(undefined);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [dateEvent, setDateEvent] = useState(new Date().toISOString().substring(0, 10));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveExam = async (e) => {
    e.preventDefault();
    const exam = {
      title: e.target.title.value.trim(),
      description: e.target.description.value.trim(),
      slug: e.target.description.value.trim(),
      time: e.target.time.value.trim(),
      content: e.target.content.value.trim(),
      isPublic: e.target.isPublic[0].checked ? "Public" : "Private",
      isSessionMorning: e.target.isSessionMorning[0].checked,
      eventDate: new Date(dateEvent).toISOString(),
      location: e.target.location.value.trim(),
      totalQuestions: e.target.totalQuestions.value.trim(),
      maxTotalTests: e.target.maxTotalTests.value.trim(),
      hasShowExplanation: e.target.hasShowExplanation.checked,
      hasShowRightAnswer: e.target.hasShowRightAnswer.checked,
      showRanking: e.target.showRanking.checked,
      questions: questions.map((item) => ({
        _id: item,
      })),
    };
    if (
      exam.title === "" ||
      exam.description === "" ||
      exam.time === "" ||
      exam.content === "" ||
      exam.eventDate === "" ||
      exam.location === "" ||
      exam.totalQuestions === "" ||
      exam.maxTotalTests === ""
      // exam.questions.length !== +exam.totalQuestions
    ) {
      //not fill all field
      openNotificationWithIcon("error", "You need to fill all of field");
    } else {
      //submit
      try {
        if (idExam === undefined) {
          let test = exam.questions
          test.splice(test.length - 1, 1)
          await addNewExam({
            ...exam,
            questions: test
          });
        } else {
          await editExam({
            ...exam,
            _id: idExam
          });
        }
        window.location = "/exam-management";
        openNotificationWithIcon("success", "A new exam has been created");
      } catch (error) { }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllQuestions();
        if (response.status === 200) {
          setQuestionData(response?.data?.question);
        }
        if (idExam !== undefined) {
          const response1 = await getQuestionById(idExam);
          if (response1.status === 200) {
            setData(response1?.data?.exam?.exam[0]);
            setQuestions(
              response1?.data?.exam?.exam[0].questions.map((item) => item._id)
            );
            setDateEvent(new Date(response1?.data?.exam?.exam[0]?.eventDate).toISOString().substring(0, 10))
          }
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  const handleCancelAddNewEdit = () => {
    window.location = "/exam-management";
  };
  return (
    <>
      <ModalAddNewExam
        show={show}
        handleClose={handleClose}
        handleSubmit={handleCancelAddNewEdit}
      />
      <Form onSubmit={handleSaveExam}>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <Breadcrumb
              className="d-none d-md-inline-block"
              listProps={{
                className: "breadcrumb-dark breadcrumb-transparent",
              }}
            >
              <Breadcrumb.Item>
                <FontAwesomeIcon icon={faHome} />
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => (window.location = "/exam-management")}
              >
                {Routes.ExamPage.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{`Edit exam`}</Breadcrumb.Item>
            </Breadcrumb>
            <h4>{`Edit exam`}</h4>
            <p className="mb-0">
              Below tables will shown all of course in your website and some
              information about them.
            </p>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Button className="mx-2" type="submit">
              <FontAwesomeIcon icon={faSave} className="me-2" />
              Save Exam
            </Button>
            <Button
              variant="outline-primary"
              className="mx-2"
              onClick={handleShow}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="table-settings mb-4 ">
          <Card
            border="light"
            className="table-wrapper table-responsive shadow-sm"
          >
            {
              data?.title !== undefined
                ?
                <Card.Body className="pt-0 my-4">
                  <Row>
                    <Col lg={7}>
                      <Form.Group
                        className={"form-group mb-3"}
                        as={Col}
                        controlId="formTitle"
                      >
                        <Form.Label>Title</Form.Label>
                        <InputGroup>
                          <Form.Control
                            defaultValue={data?.title}
                            name="title"
                            type="text"
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group
                        className={"form-group error mb-3"}
                        controlId="formDescription"
                      >
                        <Form.Label>Description</Form.Label>
                        <InputGroup>
                          <Form.Control
                            defaultValue={data?.description}
                            name="description"
                            as="textarea"
                            rows={5}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group
                        className={"form-group error mb-3"}
                        controlId="formContent"
                      >
                        <Form.Label>Content</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="content"
                            defaultValue={data?.content}
                            as="textarea"
                            rows={10}
                          />
                        </InputGroup>
                      </Form.Group>
                      <div className="d-flex justify-content-between">
                        <Form.Group
                          style={{ flex: "0 0 40%" }}
                          className="mb-3"
                          controlId="formDescription"
                        >
                          <Form.Label>Topic</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          style={{ flex: "0 0 40%" }}
                          className="mb-3"
                          controlId="formDescription"
                        >
                          <Form.Label>Exam</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </Col>
                    <Col lg={4} className="mx-5">
                      <Form.Group
                        className={"form-group mb-3 d-flex"}
                        as={Col}
                        controlId="formTitle"
                      >
                        <div>
                          <Form.Label>Time(s)</Form.Label>
                          <InputGroup>
                            <Form.Control
                              name="time"
                              defaultValue={data?.time}
                              type="text"
                            />
                          </InputGroup>
                        </div>

                        <div className="mx-4">
                          <Form.Label>Total Questions</Form.Label>
                          <InputGroup>
                            <Form.Control
                              name="totalQuestions"
                              defaultValue={data?.totalQuestions}
                              type="text"
                            />
                          </InputGroup>
                        </div>
                      </Form.Group>
                      <Form.Group
                        className={"form-group mb-3 d-flex"}
                        as={Col}
                        controlId="formTitle"
                      >
                        <div>
                          <Form.Label>Session</Form.Label>
                          <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                              inline
                              label="Morning"
                              name="isSessionMorning"
                              defaultChecked={data?.isSessionMorning}
                              type="radio"
                              id={`inline-radio-9`}
                            />
                            <Form.Check
                              inline
                              label="Afternoon"
                              name="isSessionMorning"
                              defaultChecked={!data?.isSessionMorning}
                              type="radio"
                              id={`inline-radio-10`}
                            />
                          </div>
                        </div>
                      </Form.Group>
                      <Form.Group
                        className={"form-group mb-3 d-flex"}
                        as={Col}
                        controlId="formTitle"
                      >
                        <div className="mr-3">
                          <Form.Label>Event Location</Form.Label>
                          <InputGroup>
                            <Form.Control
                              defaultValue={data?.location}
                              name="location"
                              type="text"
                            />
                          </InputGroup>
                        </div>

                        <div className="mx-4">
                          <Form.Label>Event date</Form.Label>
                          <InputGroup>
                            <Form.Control
                              value={dateEvent}
                              onChange={(e) => {
                                setDateEvent(e.target.value)
                              }}
                              name="eventDate"
                              type="date"
                            />
                          </InputGroup>
                        </div>
                      </Form.Group>
                      <Form.Group
                        className={"form-group mb-3 d-flex"}
                        as={Col}
                        controlId="formTitle"
                      >
                        <div className="mr-3">
                          <Form.Label>Max total test per user</Form.Label>
                          <InputGroup>
                            <Form.Control
                              name="maxTotalTests"
                              defaultValue={
                                data?.maxTotalTests
                              }
                              type="text"
                            />
                          </InputGroup>
                        </div>
                      </Form.Group>
                      <Form.Group
                        className={"form-group mb-3 d-flex mt-3"}
                        as={Col}
                        controlId="formTitle"
                      >
                        <div key={`inline-checkbox1`} className="mb-3">
                          <Form.Check
                            inline
                            label="Show right Answer"
                            name="hasShowRightAnswer"
                            defaultChecked={data?.hasShowRightAnswer}
                            type="checkbox"
                            id={`inline-radio-1`}
                          />
                        </div>
                        <div key={`inline-checkbox2`} className="mb-3">
                          <Form.Check
                            inline
                            label="Show explanation"
                            name="hasShowExplanation"
                            defaultChecked={data?.hasShowExplanation}
                            type="checkbox"
                            id={`inline-radio-11`}
                          />
                        </div>
                        <div key={`inline-checkbox3`} className="mb-3">
                          <Form.Check
                            inline
                            label="Show Ranking"
                            defaultChecked={data?.showRanking}
                            name="showRanking"
                            type="checkbox"
                            id={`inline-radio-13`}
                          />
                        </div>
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
                              label="Public"
                              name="isPublic"
                              defaultChecked={data.isPublic !== 'Public'}
                              type="radio"
                              id={`inline-radio-3`}
                            />
                            <Form.Check
                              inline
                              name="isPublic"
                              label="Private"
                              defaultChecked={data.isPublic !== 'Public'}
                              type="radio"
                              id={`inline-radio-4`}
                            />
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>Question List</Form.Label>
                      {questionData !== "" && (
                        <TransferQuestions
                          questions={questions}
                          setQuestions={setQuestions}
                          data={questionData.map((item) => ({
                            ...item,
                            key: item._id,
                          }))}
                        />
                      )}
                    </Form.Group>
                  </Row>
                </Card.Body>
                : 
                <Card.Body className="pt-0 my-4">
                <Row>
                  <Col lg={7}>
                    <Form.Group
                      className={"form-group mb-3"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <Form.Label>Title</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="title"
                          type="text"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group
                      className={"form-group error mb-3"}
                      controlId="formDescription"
                    >
                      <Form.Label>Description</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="description"
                          as="textarea"
                          rows={5}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group
                      className={"form-group error mb-3"}
                      controlId="formContent"
                    >
                      <Form.Label>Content</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="content"
                          defaultValue={
                            defaultExamContent
                          }
                          as="textarea"
                          rows={10}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Form.Group
                        style={{ flex: "0 0 40%" }}
                        className="mb-3"
                        controlId="formDescription"
                      >
                        <Form.Label>Topic</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        style={{ flex: "0 0 40%" }}
                        className="mb-3"
                        controlId="formDescription"
                      >
                        <Form.Label>Exam</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col lg={4} className="mx-5">
                    <Form.Group
                      className={"form-group mb-3 d-flex"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <div>
                        <Form.Label>Time(s)</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="time"
                            defaultValue={9000}
                            type="text"
                          />
                        </InputGroup>
                      </div>
  
                      <div className="mx-4">
                        <Form.Label>Total Questions</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="totalQuestions"
                            defaultValue={
                              80
                            }
                            type="text"
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <Form.Group
                      className={"form-group mb-3 d-flex"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <div>
                        <Form.Label>Session</Form.Label>
                        <div key={`inline-radio`} className="mb-3">
                          <Form.Check
                            inline
                            label="Morning"
                            name="isSessionMorning"
                            defaultChecked
                            type="radio"
                            id={`inline-radio-9`}
                          />
                          <Form.Check
                            inline
                            label="Afternoon"
                            name="isSessionMorning"
                            type="radio"
                            id={`inline-radio-10`}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group
                      className={"form-group mb-3 d-flex"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <div className="mr-3">
                        <Form.Label>Event Location</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="location"
                            type="text"
                          />
                        </InputGroup>
                      </div>
  
                      <div className="mx-4">
                        <Form.Label>Event date</Form.Label>
                        <InputGroup>
                          <Form.Control
                            value={dateEvent}
                            onChange={(e) => {
                              setDateEvent(e.target.value)
                            }}
                            name="eventDate"
                            type="date"
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <Form.Group
                      className={"form-group mb-3 d-flex"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <div className="mr-3">
                        <Form.Label>Max total test per user</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="maxTotalTests"
                            defaultValue={
                              100
                            }
                            type="text"
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <Form.Group
                      className={"form-group mb-3 d-flex mt-3"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <div key={`inline-checkbox1`} className="mb-3">
                        <Form.Check
                          inline
                          label="Show right Answer"
                          name="hasShowRightAnswer"
                          defaultChecked
                          type="checkbox"
                          id={`inline-radio-1`}
                        />
                      </div>
                      <div key={`inline-checkbox2`} className="mb-3">
                        <Form.Check
                          inline
                          label="Show explanation"
                          name="hasShowExplanation"
                          defaultChecked
                          type="checkbox"
                          id={`inline-radio-11`}
                        />
                      </div>
                      <div key={`inline-checkbox3`} className="mb-3">
                        <Form.Check
                          inline
                          label="Show Ranking"
                          defaultChecked
                          name="showRanking"
                          type="checkbox"
                          id={`inline-radio-13`}
                        />
                      </div>
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
                            label="Public"
                            name="isPublic"
                            defaultChecked
                            type="radio"
                            id={`inline-radio-3`}
                          />
                          <Form.Check
                            inline
                            name="isPublic"
                            label="Private"
                            type="radio"
                            id={`inline-radio-4`}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Question List</Form.Label>
                    {questionData !== "" && (
                      <TransferQuestions
                        questions={questions}
                        setQuestions={setQuestions}
                        data={questionData.map((item) => ({
                          ...item,
                          key: item._id,
                        }))}
                      />
                    )}
                  </Form.Group>
                </Row>
              </Card.Body>
            }

          </Card>
        </div>
      </Form>
    </>
  );
};

export default NewExamPage;
