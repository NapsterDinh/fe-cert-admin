import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
} from "@themesberg/react-bootstrap";
import { Tabs } from "antd";
import EditorToolbar, {
  formats,
  modules,
} from "app/base/components/Editor/EditorToolbar";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { addNewTopic, editTopic, getQuestionById } from "app/core/apis/topic";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import TranferSection from "./TransferSection/TransferSection";
import "./ModalStyled.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  objectives: Yup.string().required("This field is required"),
  status: Yup.string().oneOf(
    [`public`, `private`],
    "Selecting the status field is required"
  ),
  sections: Yup.array(),
});

const { TabPane } = Tabs;

export const ModalModule = ({
  handleClose,
  show,
  getAllTopic,
  currentTopic,
}) => {
  const [data, setData] = useState({
    title: "",
    slug: "",
    description: "",
    objectives: "",
    status: "public",
    sections: [],
  });
  const handleAddNewTopic = async (values, setSubmitting, resetForm) => {
    const topic = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: window.btoa(
        unescape(encodeURIComponent(values.description))
      ),
      objectivesTopic: values.objectivesTopic,
      sections: [],
      status: values.status,
    };
    if (currentTopic === "") {
      await addNewTopic(topic);
      openNotificationWithIcon("success", "Create a new topic successfully");
    } else {
      await editTopic(topic);
      openNotificationWithIcon("success", "Edit topic successfully");
    }
    resetForm();
    await getAllTopic();
    handleClose();
  };

  const generatorSlug = (value) => {
    return "/topic/" + value.toLowerCase().replaceAll(" ", "-");
  };

  useEffect(() => {
    if (currentTopic !== "") {
      (async () => {
        try {
          const response = await getQuestionById(currentTopic);
          if (response.status === 200) {
            setData({
              ...response?.data?.topic[0],
              description: decodeURIComponent(
                escape(window.atob(response?.data?.topic[0].description))
              ),
            });
          }
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [currentTopic]);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-module">
        <Formik
          enableReinitialize
          initialValues={data}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) =>
            handleAddNewTopic(values, setSubmitting, resetForm)
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
                <Modal.Header closeButton>
                  <Modal.Title>Create a new topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="card-container">
                    <Tabs type="card">
                      <TabPane tab="Information" key="1">
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
                                setFieldValue(
                                  "slug",
                                  generatorSlug(e.target.value)
                                );
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
                            errors.slug && touched.slug && "error mb-4"
                          }
                          controlId="tutorialTitle"
                        >
                          <Form.Label>Slug</Form.Label>
                          <InputGroup
                            className={
                              errors.slug && touched.slug && "error mb-3"
                            }
                          >
                            <Form.Control
                              value={values.slug}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              className={errors.slug && touched.slug && "error"}
                              name="slug"
                              type="text"
                              placeholder="Enter slug"
                            />
                          </InputGroup>

                          <ErrorMessage
                            name="slug"
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
                          <Form.Label>description</Form.Label>
                          <br></br>
                          <span>
                            Note*: Use SubHeading if you want to make table of
                            content
                          </span>
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
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="invalid-feedback"
                          />
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
                      </TabPane>
                      <TabPane tab="Section" key="2">
                        <TranferSection />
                      </TabPane>
                    </Tabs>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
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
