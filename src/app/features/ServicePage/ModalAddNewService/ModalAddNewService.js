import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import { Tooltip, Checkbox } from "antd";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { addNewPricing, editPricing } from "app/core/apis/pricing";
import { openNotificationWithIcon } from "app/base/components/Notification";

import "./ModalAddNewService.css";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price is more than 1 dollar")
    .test(
      "Is positive?",
      "ERROR: The price must be greater than 0!",
      (value) => value > 0
    ),
  duration: Yup.number()
    .required("Duration is required")
    .min(1, "Duration is more than 1 day")
    .integer("Please provide integer")
    .test(
      "Is positive?",
      "ERROR: The price must be greater than 0!",
      (value) => value > 0
    ),
  abilities: Yup.array().min(1, "Abilities is required"),
  status: Yup.string().oneOf(
    [`public`, `private`, "coming_soon"],
    "Selecting the status field is required"
  ),
});

const initialValues = {
  name: "",
  description: "",
  price: 0,
  isBestValue: false,
  duration: 30,
  abilities: [],
  status: "private",
};

const ModalAddNewService = ({
  show,
  handleClose,
  fetchAllExam,
  currentService,
  abilitiesService,
}) => {
  console.log(currentService);
  const onHandleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      let response = "";
      if (currentService === "") {
        response = await addNewPricing({
          name: values.name,
          description: values.description,
          price: values.price,
          duration: values.duration,
          isBestValue: values.isBestValue,
          abilities: values.abilities,
          status: "private",
        });
      } else {
        response = await editPricing({
          _id: currentService?._id,
          name: values.name,
          description: values.description,
          price: values.price,
          duration: values.duration,
          isBestValue: values.isBestValue,
          abilities: values.abilities,
          status: values.status,
        });
      }

      if (response.status === 200) {
        await fetchAllExam();
        handleClose();
        if (currentService === "") {
          openNotificationWithIcon("success", "Create service successfully");
        } else {
          openNotificationWithIcon("success", "Update service successfully");
        }
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
          initialValues={
            currentService === ""
              ? {
                  ...initialValues,
                  abilities: abilitiesService
                    ?.filter((t) => t.isDefault)
                    ?.map((item) => item?._id),
                }
              : {
                  ...currentService,
                  abilities: currentService?.abilities?.map(
                    (item) => item?._id
                  ),
                }
          }
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
                      <Form.Group
                        className={errors.name && touched.name && "error"}
                        controlId="tutorialname"
                      >
                        <Form.Label>Name</Form.Label>
                        <InputGroup
                          className={
                            errors.name && touched.name && "error mb-3"
                          }
                        >
                          <Form.Control
                            autoFocus
                            value={values.name}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            className={errors.name && touched.name && "error"}
                            name="name"
                            type="text"
                            placeholder="Enter name"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <Form.Group
                        className={
                          errors.description && touched.description && "error"
                        }
                        controlId="tutorialTitle"
                      >
                        <Form.Label>Description</Form.Label>
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
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <div className="d-flex">
                        <Form.Group
                          className={
                            errors.duration && touched.duration && "error mb-4"
                          }
                          controlId="tutorialTitle"
                        >
                          <Form.Label>Duration(days)</Form.Label>
                          <InputGroup
                            className={
                              errors.duration &&
                              touched.duration &&
                              "error mb-3"
                            }
                          >
                            <Form.Control
                              autoFocus
                              value={values.duration}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              className={
                                errors.duration && touched.duration && "error"
                              }
                              name="duration"
                              type="number"
                              placeholder="Enter duration"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="duration"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>
                        <Form.Group
                          style={{ marginLeft: "40px" }}
                          className={
                            errors.price && touched.price && "error mb-4"
                          }
                          controlId="tutorialTitle"
                        >
                          <Form.Label>Price ($)</Form.Label>
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
                              className={
                                errors.price && touched.price && "error"
                              }
                              name="price"
                              type="number"
                              placeholder="Enter price"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>
                      </div>
                      {/* 
                      <Form.Group
                        className={`
                        mt-3
                          ${
                            errors.isBestValue &&
                            touched.isBestValue &&
                            "error mb-4"
                          }
                        `}
                        controlId="deactivated"
                      >
                        <ErrorMessage
                          name="isBestValue"
                          component="div"
                          className="invalid-feedback"
                        />
                        <div>
                          <Tooltip
                            title={
                              "Label Best Value will be displayed with this service"
                            }
                          >
                            <Checkbox
                              key={`collapseBestValue`}
                              value="Morning"
                              checked={values.isBestValue}
                              onChange={(e) => {
                                setFieldValue("isBestValue", e.target.checked);
                              }}
                              name="isBestValue"
                            >
                              Is Best Value
                            </Checkbox>
                          </Tooltip>
                        </div>
                      </Form.Group> */}

                      <Form.Group
                        className={
                          errors.abilities && touched.abilities && "error mb-4"
                        }
                        controlId="deactivated"
                      >
                        <Form.Label>Abilities</Form.Label>
                        <ErrorMessage
                          name="abilities"
                          component="div"
                          className="invalid-feedback"
                        />
                        <div>
                          <Checkbox.Group
                            defaultValue={values?.abilities}
                            onChange={(checkedValues) => {
                              console.log(checkedValues);
                              setFieldValue("abilities", checkedValues);
                            }}
                            className="d-flex flex-wrap"
                          >
                            {abilitiesService?.map((item1, index1) => (
                              <Col lg={3} className="mb-2">
                                <Tooltip title={item1?.description}>
                                  <Checkbox
                                    disabled={item1.isDefault}
                                    key={`collapse${item1?._id}${index1}`}
                                    value={item1._id}
                                  >
                                    {item1?.name}
                                  </Checkbox>
                                </Tooltip>
                              </Col>
                            ))}
                          </Checkbox.Group>
                        </div>
                      </Form.Group>
                    </Col>
                    {currentService !== "" && (
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
                                <div
                                  key={`inline-radio-status`}
                                  className="mb-3"
                                >
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
                                  <Form.Check
                                    type={`radio`}
                                    inline
                                    label="Comming Soon"
                                    id={`inline-radio-4`}
                                    value="coming_soon"
                                    checked={values.status === "coming_soon"}
                                    onChange={() =>
                                      setFieldValue("status", "coming_soon")
                                    }
                                    name="status"
                                  />
                                </div>
                              </div>
                            </Form.Group>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
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
