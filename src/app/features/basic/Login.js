import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "app/routes";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import { login } from "app/core/apis/user";
import { updateUser } from "store/userReducer";
import configuration from "configuration";
import { message } from "antd";

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(8, "Username muse be at least 6 characters"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState("");

  const SignIn = async (values, resetForm) => {
    const result = await login({
      email: values.username,
      password: values.password,
    });

    if (result.status === 200) {
      //set token
      if (result.data?.user?.role?.name !== "admin") {
        setError("You has no permission to access to this page");
      } else {
        //set token
        configuration.setApiRequestToken(result.data.tokens);
        dispatch(updateUser(result.data));
        if (location?.state !== undefined) {
          history.push(`${location.state.from}${location.state.search}`);
        } else {
          history.push("/");
        }
      }
    } else {
      setError(result?.data?.message);
      resetForm();
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.DashboardPage.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${"adadad"})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={schema}
                  onSubmit={(values, { setSubmitting, resetForm }) =>
                    SignIn(values, resetForm)
                  }
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = props;

                    return (
                      <Form
                        className="mt-4 basic-form"
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        <div className="d-flex justify-content-center">
                          <span style={{ color: "red" }}>{error}</span>
                        </div>
                        <Form.Group id="username" className="">
                          <Form.Label>Your Username</Form.Label>
                          <InputGroup
                            className={
                              errors.username && touched.username && "error"
                            }
                          >
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              type="text"
                              placeholder="Username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.username && touched.username && "error"
                              }
                              name="username"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Group id="password" className="mb-4">
                            <Form.Label>Your Password</Form.Label>
                            <InputGroup
                              className={
                                errors.password && touched.password && "error"
                              }
                            >
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt} />
                              </InputGroup.Text>
                              <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.password && touched.password && "error"
                                }
                                maxLength={16}
                              />
                            </InputGroup>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Form.Group>
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                          disabled={isSubmitting}
                        >
                          Sign in
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default LoginPage;
