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
import EditorToolbar, {
  formats,
  modules,
} from "app/base/components/Editor/EditorToolbar";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { editTopic, getTopicById } from "app/core/apis/topic";
import { Routes } from "app/routes";
//data
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import SectionList from "./SectionList/SectionList";
import LessonsList from "./LessonsList/LessonsList";
import { useHistory } from "react-router-dom";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  objectives: Yup.string().required("This field is required"),
  status: Yup.string().oneOf(
    [`public`, `private`],
    "Selecting the status field is required"
  ),
  sections: Yup.array(),
});

const NewModulePage = () => {
  const [data, setData] = useState("");
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleEditTopic = async (values, setSubmitting, resetForm) => {
    try {
      await editTopic({
        _id: data?._id,
        title: values.title.trim(),
        description: window.btoa(
          unescape(encodeURIComponent(values.description))
        ),
        objective: values.objectives
          .trim()
          .split("\n")
          .map((item) => item.trim())
          .filter((t) => t !== ""),
        sections: values.sections,
        status: values.status,
      });
      openNotificationWithIcon("success", "Edit topic successfully");
      resetForm();
      history.push("/topic-management");
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTopicById(id);
        if (response?.status === 200) {
          let temp = { ...response?.data?.topic[0] };
          setData({
            ...temp,
            description: decodeURIComponent(
              escape(window.atob(temp?.description))
            ),
            objectives: temp?.objective.join("\n"),
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {data !== "" && (
        <Formik
          enableReinitialize
          initialValues={data}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) =>
            handleEditTopic(values, setSubmitting, resetForm)
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
                        onClick={() => (window.location = "/topic-management")}
                      >
                        {Routes.ModulePage.name}
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Edit topic</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Edit topic</h4>
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
                      Save Topic
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="mx-2"
                      onClick={() => setShow(true)}
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
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Form.Group>
                          <Form.Group
                            className={
                              errors.description &&
                              touched.description &&
                              "error mb-4"
                            }
                            controlId="tutorialTitle"
                          >
                            <Form.Label>Description</Form.Label>
                            <br></br>
                            <span>
                              Note*: Use SubHeading if you want to make table of
                              content
                            </span>
                            {values?.description !== "" && (
                              <Field name="description">
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
                            )}
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={4} className="mx-5">
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
                          <Form.Group
                            className={
                              errors.objectives &&
                              touched.objectives &&
                              "error mb-4"
                            }
                            controlId="tutorialTitle"
                          >
                            <Form.Label>What student will learn ?</Form.Label>
                            <InputGroup
                              className={
                                errors.objectives &&
                                touched.objectives &&
                                "error mb-3"
                              }
                            >
                              <Form.Control
                                autoFocus
                                value={values.objectives}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.objectives &&
                                  touched.objectives &&
                                  "error"
                                }
                                name="objectives"
                                type="text"
                                as="textarea"
                                rows={6}
                                placeholder="Enter what student will learn"
                              />
                            </InputGroup>
                            <ErrorMessage
                              name="objectives"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Form.Group>
                          <span>
                            If you need enter many objectives, you need to press
                            Enter in the final of sentence.
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <SectionList sections={data?.sections} />
                        </Col>
                        <Col lg={6}>
                          <LessonsList />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default NewModulePage;
