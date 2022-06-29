import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
} from "@themesberg/react-bootstrap";
import { Input, Space, Table, Tabs, Tag } from "antd";
import EditorToolbar, {
  formats,
  modules,
} from "app/base/components/Editor/EditorToolbar";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { addNewTopic, editTopic } from "app/core/apis/topic";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import "./ModalStyled.css";

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

const { TabPane } = Tabs;

export const ModalModule = ({
  handleClose,
  show,
  getAllTopic,
  currentTopic,
}) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    objectives: "",
    status: "public",
    sections: [],
  });
  const handleAddNewTopic = async (values, setSubmitting, resetForm) => {
    if (currentTopic === "") {
      await addNewTopic({
        title: values.title.trim(),
        description: window.btoa(
          unescape(encodeURIComponent(values.description))
        ),
        objective: values.objectives
          .trim()
          .split("\n")
          .map((item) => item.trim())
          .filter((t) => t !== ""),
        sections: [],
        status: values.status,
      });
      resetForm();
      await getAllTopic();
      handleClose();
      openNotificationWithIcon("success", "Create a new topic successfully");
    } else {
      await editTopic({
        _id: currentTopic?._id,
        title: values.title.trim(),
        description: window.btoa(
          unescape(encodeURIComponent(values.description))
        ),
        objective: values.objectives
          .trim()
          .split("\n")
          .map((item) => item.trim())
          .filter((t) => t !== ""),
        sections: currentTopic?.sections,
        status: values.status,
      });
      resetForm();
      await getAllTopic();
      handleClose();
      openNotificationWithIcon("success", "Edit topic successfully");
    }
  };

  useEffect(() => {
    if (currentTopic !== "") {
      (async () => {
        try {
          setData({
            ...currentTopic,
            description: decodeURIComponent(
              escape(window.atob(currentTopic.description))
            ),
            objectives: currentTopic.objective.join("\n"),
          });
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
                  <Modal.Title>
                    {currentTopic !== "" ? "Edit topic" : "Create a new topic"}
                  </Modal.Title>
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
                      {currentTopic !== "" && (
                        <TabPane tab="Section" key="2">
                          <TableSectionTopic data={data?.sections} />
                        </TabPane>
                      )}
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

export const TableSectionTopic = ({ data, editSection, deleteSection }) => {
  console.log(data);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
      sorter: (a, b) => {
        return a.title.toLowerCase() < b.title.toLowerCase();
      },

      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("title"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => new Date(a.createdAt) < new Date(b.createdAt),
      sortDirections: ["descend", "ascend"],
      render: (createdAt) => {
        return <span>{new Date(createdAt).toLocaleString()}</span>;
      },
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("updatedAt"),
      sorter: (a, b) => new Date(a.updatedAt) < new Date(b.updatedAt),
      sortDirections: ["descend", "ascend"],
      render: (updateAt) => {
        return <span>{new Date(updateAt).toLocaleString()}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "5%",
      align: "center",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status < b.status,
      sortDirections: ["descend", "ascend"],
      render: (status) => {
        let color = status === "public" ? "geekblue" : "green";
        return (
          <span>
            <Tag color={color} key={status}>
              {status}
            </Tag>
          </span>
        );
      },
    },
  ];
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="mt-3">
        <Table columns={columns} dataSource={data} />
      </Card.Body>
    </Card>
  );
};
