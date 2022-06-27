import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { addNewSection } from "app/core/apis/section";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Select } from "antd";
import "./ModalAddNewSection.css";

const { Option } = Select;
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  status: Yup.string().oneOf(
    [`public`, `private`],
    "Selecting the status field is required"
  ),
  topic: Yup.string().required("Topic is required"),
});

const ModalAddNewSection = ({ show, handleClose, getAllSection, topic }) => {
  const handleSaveSection = async (values, setSubmitting, resetForm) => {
    const section = {
      title: values.title.trim(),
      status: "public",
      topic: values.topic,
    };

    try {
      const response = await addNewSection(section);
      if (response.status === 201) {
        await getAllSection();
        handleClose();
        openNotificationWithIcon("success", "Create section successfully");
      } else {
        handleClose();
        openNotificationWithIcon("eror", "Create section failed");
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
        onHide={() => {
          handleClose();
        }}
        className="modal-section"
      >
        <Formik
          enableReinitialize
          initialValues={{
            title: "",
            status: "public",
            topic: "",
          }}
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
                <Modal.Header closeButton>
                  <Modal.Title>Add new Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Form.Group
                      className={errors.title && touched.title && "error mb-4"}
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
                          className={errors.title && touched.title && "error"}
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
                    <Form.Label style={{ marginRight: "20px" }}>
                      Topic
                    </Form.Label>
                    <Form.Group
                      className={"form-group mb-3"}
                      as={Col}
                      controlId="formTitle"
                    >
                      <Select
                        style={{ width: "300px" }}
                        value={values.topic}
                        onChange={(values) => setFieldValue("topic", values)}
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
                    </Form.Group>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleClose();
                    }}
                  >
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

export default ModalAddNewSection;
