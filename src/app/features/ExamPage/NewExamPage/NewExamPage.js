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
//components
import { Select, Spin } from "antd";
import Chart from "app/base/components/Chart/Chart";
import EditorToolbar, {
  formats,
  modules,
} from "app/base/components/Editor/EditorToolbar";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import { openNotificationWithIcon } from "app/base/components/Notification";
import {
  editExam,
  getQuestionById as getQuestionByIDExam,
} from "app/core/apis/exam";
import { deleteQuestion as deleteQuestionAPI } from "app/core/apis/question";
import { getAllTopic } from "app/core/apis/topic";
import { groupBy } from "app/core/utils/arrayUtils";
//data
import { Routes } from "app/routes";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
//components
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import * as Yup from "yup";
import ModalAddNewExam from "../ModalAddNewExam/ModalNewExam";
import TableQuestion from "../TablesQuestion/TablesQuestion";
import ModalAddNewQuestion from "./ModalAddNewQuestion/ModalNewQuestion";

const { Option } = Select;
const schema = Yup.object().shape();

const NewExamPage = () => {
  const history = useHistory();
  let { idExam } = useParams();
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const [showModalQuestion, setShowModalQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [chooseQuestionDelete, setChooseQuestionDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [savePercentTopic, setPercentTopic] = useState("");
  const [data, setData] = useState({
    type: "exam",
    title: "",
    content: `<p>This Exam is based on the Morning session of origin FE exam. There would be 80 questions in total, which distribute largely in 3 sections:</p><ul><li>Technology: 50 questions</li><li>Management: 10 questions</li><li>Strategy: 20 questions.</li></ul><p>All questions are in single-choice question type. Candidate is considered as "Passed" if he/she has more than 60% of right answers, which means more than 48 questions.</p><p>Rules:</p><p>-&nbsp;Maximum number of tests:&nbsp;100</p><p class="ql-align-center"><br></p>`,
    isPublic: "",
    time: 9000,
    totalQuestions: 80,
    eventDate: "",
    isSessionMorning: true,
    questions: [],
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalConfirmDelete = useSelector((state) => state.confirmDelete);

  dispatch(
    updateModalInfo({
      title: "Confirm delete this question",
      body: `Are you sure to delete this question ?
        This question in exam which contains this will be remove.
        This modified changes will not saved and you can't rollback`,
    })
  );

  const handleSaveExam = async (values, setSubmitting, resetForm) => {
    const exam = {
      ...values,
      time: parseInt(values.time),
      eventDate: new Date(values.eventDate).toISOString(),
      questions: values.questions.map((item) => ({
        _id: item.id,
      })),
      totalQuestions: values.questions.length,
      content: window.btoa(unescape(encodeURIComponent(values.content))),
    };
    try {
      await editExam({
        ...exam,
        _id: idExam,
      });
      history.push("/exam-management");
      openNotificationWithIcon("success", "Update exam successfully");
    } catch (error) {}
  };

  const handleDeleteQuestion = async () => {
    try {
      const response = await deleteQuestionAPI({
        _id: chooseQuestionDelete,
      });
      if (response.status === 200) {
        await fetchAPIGetQuestionByID();
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("success", "Delete question successfully");
      } else {
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("error", "Delete question failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  const editQuestion = (id) => {
    setCurrentQuestion(data?.questions.find((item) => item._id === id));
    setShowModalQuestion(true);
  };

  const deleteQuestion = (id) => {
    setChooseQuestionDelete(id);
    dispatch(toggleShowModal({ show: true }));
  };

  const fetchAPIGetQuestionByID = async () => {
    try {
      setLoading(true);
      const response1 = await getQuestionByIDExam(idExam);
      if (response1.status === 200) {
        let temp = [...response1?.data?.exam?.exam[0].questions].filter(
          (item) => !item.isDeleted
        );
        setData({
          ...response1?.data?.exam?.exam[0],
          content: decodeURIComponent(
            escape(window.atob(response1?.data?.exam?.exam[0]?.content))
          ),
          eventDate:
            response1?.data?.exam?.exam[0]?.eventDate !== undefined
              ? new Date(response1?.data?.exam?.exam[0]?.eventDate)
                  .toISOString()
                  .substring(0, 10)
              : "",

          questions: temp.map((item) => ({
            ...item,
            key: item._id,
            id: item._id,
            question: decodeURIComponent(escape(window.atob(item?.question))),
            isHasExplanation: item?.explanation !== "" ? "True" : "False",
            topic: topic.find((t) => t._id === item.topic)?.title,
          })),
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response2 = await getAllTopic();
        setTopic(response2?.data?.topic);
        const response1 = await getQuestionByIDExam(idExam);
        if (response1.status === 200) {
          let temp = [...response1?.data?.exam?.exam[0].questions].filter(
            (item) => !item.isDeleted
          );
          setData({
            ...response1?.data?.exam?.exam[0],
            content: decodeURIComponent(
              escape(window.atob(response1?.data?.exam?.exam[0]?.content))
            ),
            eventDate:
              response1?.data?.exam?.exam[0]?.eventDate !== undefined
                ? new Date(response1?.data?.exam?.exam[0]?.eventDate)
                    .toISOString()
                    .substring(0, 10)
                : "",
            questions: temp.map((item) => ({
              ...item,
              key: item._id,
              id: item._id,
              question: decodeURIComponent(escape(window.atob(item?.question))),
              isHasExplanation: item?.explanation !== "" ? "True" : "False",
              topic: response2?.data?.topic.find((t) => t._id === item.topic)
                ?.title,
            })),
          });
        }
        setLoading(false);
      } catch (error) {
        alert(error);
      } finally {
      }
    })();
  }, []);

  useEffect(() => {
    setPercentTopic(countPercentTopicInExam(data?.questions));
  }, [data]);

  const handleCancelAddNewEdit = () => {
    window.location = "/exam-management";
  };

  const countPercentTopicInExam = (dataParams) => {
    if (dataParams !== undefined) {
      const groupByIDTopic = groupBy(dataParams, "topic");

      return {
        labels: Object.keys(groupByIDTopic),
        series: Object.entries(groupByIDTopic).map((item) =>
          parseInt(item[1].length)
        ),
      };
    }
    return {
      labels: ["Empty"],
      series: [100],
    };
  };

  const getCountByStandardTopic = (name) => {
    if (savePercentTopic !== "") {
      const indexTopic = savePercentTopic?.labels?.findIndex(
        (item) => item === name
      );
      if (indexTopic === -1) {
        return 0;
      } else {
        return savePercentTopic?.series[indexTopic];
      }
    }
  };

  console.log(savePercentTopic);

  return (
    <>
      <ModalConfirmDelete
        handleSubmit={handleDeleteQuestion}
        handleClose={() => {
          setChooseQuestionDelete("");
          dispatch(toggleShowModal({ show: false }));
        }}
        {...modalConfirmDelete}
      />
      <ModalAddNewExam
        show={show}
        handleClose={handleClose}
        handleSubmit={handleCancelAddNewEdit}
      />
      {topic !== "" && (
        <ModalAddNewQuestion
          examId={idExam}
          show={showModalQuestion}
          handleClose={() => {
            setCurrentQuestion("");
            setShowModalQuestion(false);
          }}
          topic={topic}
          item={currentQuestion}
          setItem={setCurrentQuestion}
          fetchQuestionList={fetchAPIGetQuestionByID}
        />
      )}

      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          handleSaveExam(values, setSubmitting, resetForm)
        }
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Form noValidate onSubmit={handleSubmit}>
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
                    <Breadcrumb.Item active>Edit exam</Breadcrumb.Item>
                  </Breadcrumb>
                  <h4>Edit exam</h4>
                  <p className="mb-0">
                    Below tables will shown all of course in your website and
                    some information about them.
                  </p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <Button
                    className="mx-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
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
                  <Card.Body
                    className="pt-0 my-4"
                    style={{ position: "relative", minHeight: "400px" }}
                  >
                    <Spin tip={"Loading..."} spinning={loading}>
                      <>
                        <Row>
                          <Col lg={7}>
                            <Form.Group
                              className={
                                errors.title && touched.title && "error mb-4"
                              }
                              controlId="tutorialTitle"
                            >
                              <Form.Label>Title</Form.Label>
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="invalid-feedback"
                              />
                              <InputGroup
                                className={
                                  errors.title && touched.title && "error mb-3"
                                }
                              >
                                <Form.Control
                                  autoFocus
                                  value={values.title}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  className={
                                    errors.title && touched.title && "error"
                                  }
                                  name="title"
                                  type="text"
                                  placeholder="Enter title"
                                />
                              </InputGroup>
                            </Form.Group>
                            <Form.Group
                              className={
                                errors.content &&
                                touched.content &&
                                "error mb-4"
                              }
                              controlId="tutorialTitle"
                            >
                              <Form.Label>Content</Form.Label>
                              <ErrorMessage
                                name="content"
                                component="div"
                                className="invalid-feedback"
                              />

                              <Field name="content">
                                {({ field }) => (
                                  <div className="text-editor">
                                    <EditorToolbar />
                                    <ReactQuill
                                      theme="snow"
                                      modules={modules}
                                      formats={formats}
                                      value={field.value}
                                      onChange={field.onChange(field.name)}
                                    />
                                  </div>
                                )}
                              </Field>
                            </Form.Group>
                          </Col>
                          <Col lg={4} className="mx-5">
                            <Form.Group
                              className={
                                "form-group mb-3 d-flex justify-content-between"
                              }
                              as={Col}
                              controlId="formTitle"
                            >
                              <Col
                                lg={5}
                                className={
                                  errors.isPublic &&
                                  touched.isPublic &&
                                  "error mb-4"
                                }
                              >
                                <Form.Label>Status</Form.Label>

                                <div
                                  key={`inline-radio-status`}
                                  className="mb-3"
                                >
                                  <Form.Check
                                    type={`radio`}
                                    inline
                                    label="Public"
                                    id={`inline-radio-3`}
                                    value="Public"
                                    checked={values.isPublic === "Public"}
                                    onChange={() =>
                                      setFieldValue("isPublic", "Public")
                                    }
                                    name="isPublic"
                                  />
                                  <Form.Check
                                    type={`radio`}
                                    inline
                                    label="Private"
                                    id={`inline-radio-5`}
                                    value="Private"
                                    checked={values.isPublic === "Private"}
                                    onChange={() =>
                                      setFieldValue("isPublic", "Private")
                                    }
                                    name="isPublic"
                                  />
                                </div>
                                <ErrorMessage
                                  name="isPublic"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              <Col
                                lg={5}
                                className={
                                  errors.isSessionMorning &&
                                  touched.isSessionMorning &&
                                  "error mb-4"
                                }
                              >
                                <Form.Label>Session</Form.Label>

                                <div
                                  key={`inline-radio-status-2`}
                                  className="mb-3"
                                >
                                  <Form.Check
                                    type={`radio`}
                                    inline
                                    label="Morning"
                                    id={`inline-radio-11`}
                                    value="Morning"
                                    checked={
                                      values.isSessionMorning !== undefined &&
                                      values.isSessionMorning
                                    }
                                    onChange={() =>
                                      setFieldValue("isSessionMorning", true)
                                    }
                                    name="isSessionMorning"
                                  />
                                  <Form.Check
                                    type={`radio`}
                                    inline
                                    disabled
                                    label="Afternoon"
                                    id={`inline-radio-12`}
                                    value="Afternoon"
                                    checked={
                                      values.isSessionMorning !== undefined &&
                                      !values.isSessionMorning
                                    }
                                    onChange={() =>
                                      setFieldValue("isSessionMorning", false)
                                    }
                                    name="isSessionMorning"
                                  />
                                </div>
                                <ErrorMessage
                                  name="isSessionMorning"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group
                              className={
                                "form-group mb-3 d-flex justify-content-between"
                              }
                              as={Col}
                              controlId="formTitle"
                            >
                              <Col
                                lg={5}
                                className={
                                  errors.time && touched.time && "error mb-4"
                                }
                              >
                                <Form.Label>Time(s)</Form.Label>

                                <InputGroup>
                                  <Form.Control
                                    value={values.time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="time"
                                    type="text"
                                  />
                                </InputGroup>
                                <ErrorMessage
                                  name="time"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              <Col
                                lg={5}
                                className={
                                  errors.eventDate &&
                                  touched.eventDate &&
                                  "error mb-4"
                                }
                              >
                                <Form.Label>Event date</Form.Label>

                                <InputGroup>
                                  <Form.Control
                                    name="eventDate"
                                    value={values.eventDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="date"
                                  />
                                </InputGroup>
                                <ErrorMessage
                                  name="eventDate"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group
                              className={"form-group mb-3 d-flex"}
                              as={Col}
                              controlId="formTitle"
                            >
                              <Col
                                lg={5}
                                className={
                                  errors.totalQuestions &&
                                  touched.totalQuestions &&
                                  "error mb-4"
                                }
                              >
                                <Form.Label>Total Questions</Form.Label>

                                <InputGroup>
                                  <Form.Control
                                    disabled
                                    name="totalQuestions"
                                    value={values.questions.length}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                  />
                                </InputGroup>
                                <ErrorMessage
                                  name="totalQuestions"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group
                              className={"form-group mb-3 d-flex"}
                              as={Col}
                              controlId="formTitle"
                            >
                              <Col lg={5}>
                                <Form.Label>Number of Examinees: </Form.Label>
                                <p>{data?.numberExaminees}</p>
                              </Col>
                              <Col>
                                <Form.Label>Standard exam format: </Form.Label>
                                <p>
                                  Technology:
                                  <span
                                    style={{
                                      marginLeft: "20px",
                                      color: "red",
                                      marginRight: "10px",
                                    }}
                                  >
                                    {getCountByStandardTopic("Technology")}
                                  </span>
                                  / 50 questions
                                </p>
                                <p>
                                  Management:
                                  <span
                                    style={{
                                      marginLeft: "20px",
                                      color: "red",
                                      marginRight: "10px",
                                    }}
                                  >
                                    {getCountByStandardTopic("Management")}
                                  </span>
                                  / 10 questions
                                </p>
                                <p>
                                  Strategy:
                                  <span
                                    style={{
                                      marginLeft: "20px",
                                      color: "red",
                                      marginRight: "10px",
                                    }}
                                  >
                                    {getCountByStandardTopic("Strategy")}
                                  </span>
                                  / 20 questions
                                </p>
                              </Col>
                            </Form.Group>
                            {data?.questions?.length > 0 && (
                              <>
                                <Form.Label>
                                  Statistic of topic questions:{" "}
                                </Form.Label>
                                <Chart width={450} {...savePercentTopic} />
                              </>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Form.Group
                            className="mb-3"
                            controlId="formDescription"
                          >
                            <div className="d-flex justify-content-between my-3">
                              <Form.Label>Question List</Form.Label>
                              <Button
                                onClick={() => setShowModalQuestion(true)}
                              >
                                Add New Question
                              </Button>
                            </div>
                            <TableQuestion
                              data={data?.questions?.sort(
                                (a, b) =>
                                  new Date(b.updatedAt).getTime() -
                                  new Date(a.updatedAt).getTime()
                              )}
                              editQuestions={editQuestion}
                              deleteQuestion={deleteQuestion}
                            />
                          </Form.Group>
                        </Row>
                      </>
                    </Spin>
                  </Card.Body>
                </Card>
              </div>
              {/* <AfternoonExamAdd /> */}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default NewExamPage;
