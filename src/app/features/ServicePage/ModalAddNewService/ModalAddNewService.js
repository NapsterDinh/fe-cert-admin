import {
  Button, Card, Col,
  Form,
  InputGroup,
  Modal,
  Row
} from "@themesberg/react-bootstrap";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { addNewExam } from "app/core/apis/exam";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import "./ModalAddNewService.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Price is required"),
  status: Yup.string().oneOf(
    [`public`, `private`],
    "Selecting the status field is required"
  ),
});

const initialValues = {
  title: "",
  description: "",
  content: "",
  status: "private",
};

const ModalAddNewService = ({ show, handleClose, fetchAllExam }) => {
  const onHandleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      const response = await addNewExam({
        type: values.type,
        title: values.title,
        content: window.btoa(unescape(encodeURIComponent(values.content))),
        isPublic: "Private",
      });
      if (response.status === 201) {
        await fetchAllExam();
        handleClose();
        openNotificationWithIcon("success", "Create exam successfully");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <>
      <Modal
        backdrop={`static`}
        show={show}
        onHide={handleClose}
        className="modal-add-new-exam"
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) =>
            onHandleSubmit(values, setSubmitting, resetForm)
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
                  <Modal.Title>Add new service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col className="col-left">
                      {/* <Form.Group
                        className={errors.type && touched.type && "error mb-4"}
                        controlId="tutorialTitle"
                      >
                        <Form.Label>Type</Form.Label>
                        <div>
                          <Select
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="type"
                            value={values.type}
                          >
                            <Option key={"exam-type"} value={"exam"}>
                              Exam
                            </Option>
                            <Option key={"exam-type"} value={"custem_exam"}>
                              Custom Exam
                            </Option>
                          </Select>
                        </div>
                      </Form.Group> */}
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
                            className={errors.title && touched.title && "error"}
                            name="title"
                            type="text"
                            placeholder="Enter title"
                          />
                        </InputGroup>
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
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        />
                        <InputGroup
                          className={
                            errors.description &&
                            touched.description &&
                            "error mb-3"
                          }
                        >
                          <Form.Control
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.description &&
                              touched.description &&
                              "error"
                            }
                            name="description"
                            type="text"
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group
                        className={
                          errors.price && touched.price && "error mb-4"
                        }
                        controlId="tutorialTitle"
                      >
                        <Form.Label>Price</Form.Label>
                        <ErrorMessage
                          name="price"
                          component="div"
                          className="invalid-feedback"
                        />
                        <InputGroup
                          className={
                            errors.price && touched.price && "error mb-3"
                          }
                        >
                          <Form.Control
                            autoFocus
                            value={values.price}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            className={errors.price && touched.price && "error"}
                            name="price"
                            type="number"
                            placeholder="Enter price"
                          />
                        </InputGroup>
                      </Form.Group>
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
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
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

export default ModalAddNewService;
