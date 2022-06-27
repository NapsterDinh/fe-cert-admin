import {
  faAngleDoubleRight,
  faHome,
  faPlus,
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
import { Select } from "antd";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { deleteLesson } from "app/core/apis/lessons";
import { editSection, getSectionById } from "app/core/apis/section";
import { Routes } from "app/routes";
// import { section } from "app/data/section";
//data
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import * as Yup from "yup";
import ModalAddSection from "../ModalAddSection/ModalAddSection";
import ModalLecture from "../ModalLecture/ModalLecture";
import TableLectures from "../TableLectures/TableLectures";
import { getAllTopic } from "app/core/apis/topic";

const { Option } = Select;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  status: Yup.string().oneOf(
    [`public`, `private`],
    "Selecting the status field is required"
  ),
  topic: Yup.string().required("Topic is required"),
  lessons: Yup.array(),
});

const NewSectionPage = () => {
  let { idSection } = useParams();
  const history = useHistory();
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const [showLecture, setShowLecture] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentLecture, setCurrentLecture] = useState("");
  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const [topic, setTopic] = useState([]);
  const handleSaveSection = async (values) => {
    const section = {
      ...data,
      title: values.title,
      status: values.status,
      lessons: data?.lessons,
      topic: values.topic,
    };
    try {
      const response = await editSection(section);
      if (response.status === 201) {
        openNotificationWithIcon("success", "Update section successfully");
        history.push("/section-management");
      } else {
        openNotificationWithIcon("error", "Update section failed");
      }
    } catch (error) {}
  };

  const fetchSectionByID = async () => {
    try {
      const response = await getSectionById(idSection);
      if (response.status === 200) {
        setData({
          ...response?.data?.topicSection?.[0],
          topic: response?.data?.topicSection?.[0]?.topic?._id,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response2 = await getAllTopic();
        setTopic(response2?.data?.topic);
        await fetchSectionByID();
      } catch (error) {}
    })();
  }, []);

  const handleCancelAddNewEdit = () => {
    window.location = "/section-management";
  };

  dispatch(
    updateModalInfo({
      title: "Confirm delete this lesson",
      body: `Are you sure to delete this lesson ?
        This modified changes will not saved and you can't rollback`,
    })
  );

  const handleDeleteLecture = async () => {
    try {
      const response = await deleteLesson(currentLecture);
      dispatch(toggleShowModal({ show: false }));
      if (response.status === 200) {
        await fetchSectionByID();
        openNotificationWithIcon("success", "Delete lesson successfully");
      } else {
        openNotificationWithIcon("error", "Delete lesson failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteLecture = (id) => {
    setCurrentLecture(id);
    dispatch(toggleShowModal({ show: true }));
  };

  const editLecture = (id) => {
    setCurrentLecture(id);
    setShowLecture(true);
  };

  return (
    <>
      <ModalAddSection
        idSection={idSection}
        show={show}
        handleClose={handleClose}
        handleSubmit={handleCancelAddNewEdit}
      />
      <ModalConfirmDelete
        handleSubmit={handleDeleteLecture}
        handleClose={() => dispatch(toggleShowModal({ show: false }))}
        {...modalConfirmDelete}
      />
      <ModalLecture
        fetchSectionByID={fetchSectionByID}
        idSection={idSection}
        show={showLecture}
        lectures={data?.lessons}
        dataSection={data}
        selectedLecture={currentLecture}
        handleClose={() => {
          setCurrentLecture("");
          setShowLecture(false);
        }}
      />
      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          handleSaveSection(values, setSubmitting, resetForm)
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
                      onClick={() => (window.location = "/section-management")}
                    >
                      {Routes.SectionPage.name}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit section</Breadcrumb.Item>
                  </Breadcrumb>
                  <h4>Edit section</h4>
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
                    Save Section
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
                  <Card.Body className="pt-0 my-4">
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
                          className={"form-group mb-3 d-flex"}
                          as={Col}
                          controlId="formTitle"
                        >
                          <div>
                            <Form.Label>Status</Form.Label>
                            <div key={`inline-radio-status`} className="mb-3">
                              <Form.Check
                                type={`radio`}
                                inline
                                label="Public"
                                id={`inline-radio-3`}
                                value="public"
                                checked={values.status === "public"}
                                onChange={() =>
                                  setFieldValue("status", "public")
                                }
                                name="status"
                              />
                              <Form.Check
                                type={`radio`}
                                inline
                                label="Private"
                                id={`inline-radio-5`}
                                value="private"
                                checked={values.status === "private"}
                                onChange={() =>
                                  setFieldValue("status", "private")
                                }
                                name="status"
                              />
                            </div>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col lg={4} className="">
                        <div
                          className={
                            errors.topic && touched.topic && "error mb-4"
                          }
                        >
                          <Form.Label style={{ marginRight: "20px" }}>
                            Topic
                          </Form.Label>
                          <Select
                            style={{ width: "300px" }}
                            value={values.topic}
                            onChange={(values) =>
                              setFieldValue("topic", values)
                            }
                          >
                            {topic?.map((t) => (
                              <Option key={t._id} value={t._id}>
                                {t.title}
                              </Option>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "red",
                              marginTop: "20px",
                              fontSize: "12.25px",
                            }}
                          >
                            {errors.topic}
                          </p>

                          <ErrorMessage
                            name="topic"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Group className="mb-3" controlId="formDescription">
                        <div className="d-flex justify-content-between my-3">
                          <Form.Label
                            style={{ lineHeight: "36px", fontSize: "20px" }}
                          >
                            Lessons List
                          </Form.Label>
                          <Button
                            className="mx-2"
                            onClick={() => setShowLecture(true)}
                          >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            New Lesson
                          </Button>
                        </div>

                        <TableLectures
                          data={data?.lessons
                            ?.map((item) => ({
                              ...item,
                              id: item._id,
                              key: item._id,
                            }))
                            ?.sort(
                              (a, b) =>
                                new Date(b.updatedAt).getTime() -
                                new Date(a.updatedAt).getTime()
                            )}
                          editLecture={editLecture}
                          deleteLecture={deleteLecture}
                        />
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default NewSectionPage;
