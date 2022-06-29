import {
  Button,
  Card,
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
import { openNotificationWithIcon } from "app/base/components/Notification";
import { addNewLesson, editLesson, getLessonById } from "app/core/apis/lessons";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import "./ModalLecture.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
  status: Yup.string().oneOf(
    [`public`, `private`],
    "Selecting the status field is required"
  ),
});

const ModalLecture = ({
  show,
  handleClose,
  selectedLecture,
  lectures,
  dataSection,
  idSection,
  fetchSectionByID,
}) => {
  const [data, setData] = useState({
    title: "",
    body: "",
    status: "public",
  });
  useEffect(() => {
    (async () => {
      if (selectedLecture !== "") {
        //call API
        try {
          const response = await getLessonById(selectedLecture);
          setData({
            ...response?.data?.topicLesson?.[0],
            body: decodeURIComponent(escape(window.atob(response?.data?.topicLesson?.[0]?.body))),
          });
        } catch (error) {}
      } else {
        setData({
          title: "",
          body: "",
          status: "public",
        });
      }
    })();
  }, [selectedLecture]);


  const onHandleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      let response = "";
      if (selectedLecture === "") {
        response = await addNewLesson({
          title: values.title,
          body: window.btoa(unescape(encodeURIComponent(values.body))),
          tableOfContent: generatorTablesContent(values.body)[0],
          status: values.status,
          sectionId: idSection,
        });
        if (response.status === 201) {
          await fetchSectionByID();
          handleClose();
          openNotificationWithIcon("success", "Create lectures successfully");
        }
      } else {
        response = await editLesson({
          _id: selectedLecture,
          title: values.title,
          body: window.btoa(unescape(encodeURIComponent(values.body))),
          tableOfContent: generatorTablesContent(values.body)[0],
          status: values.status,
          sectionId: idSection,
        });
        if (response.status === 201) {
          await fetchSectionByID();
          handleClose();
          openNotificationWithIcon("success", "Update lectures successfully");
        }
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const generatorTablesContent = (value) => {
    const strCloseH2 = value.split(`</h2>`);
    let temp = [];
    strCloseH2.map((item) => {
      const indexH2 = item.indexOf(`<h2>`);
      if (indexH2 !== -1) {
        const spanStr = document.createElement("span");
        spanStr.innerHTML = item.substring(indexH2 + 4);
        temp.push(spanStr.textContent || spanStr.innerText);
      }
    });
    return [
      temp,
      value
        .split(`</h2>`)
        .map((item2, index) => {
          return item2.replace(`<h2>`, `<h2 id="${temp[index]}">`);
        })
        .join(),
    ];
  };

  return (
    <>
      <Modal
        backdrop={`static`}
        show={show}
        onHide={handleClose}
        className="modal-lecture"
      >
        <Formik
          enableReinitialize
          initialValues={data}
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
                  <Modal.Title>
                    {selectedLecture !== ""
                      ? "Edit Lecture"
                      : "Add new Lecture"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col lg={9} className="col-left">
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
                      <Form.Group
                        className={errors.body && touched.body && "error mb-4"}
                        controlId="tutorialTitle"
                      >
                        <Form.Label>Body</Form.Label>
                        <br></br>
                        <span>
                          Note*: Use SubHeading if you want to make table of
                          content
                        </span>
                        <Field name="body">
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
                          name="body"
                          component="div"
                          className="invalid-feedback"
                        />
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
                          {selectedLecture !== "" && (
                            <Card.Text>
                              Date Created:{" "}
                              <span>
                                {data?.createdAt !== undefined
                                  ? new Date(data.createdAt).toLocaleString()
                                  : ""}
                              </span>
                            </Card.Text>
                          )}
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

export default ModalLecture;
