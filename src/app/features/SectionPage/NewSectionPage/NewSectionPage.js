import {
  faAngleDoubleRight,
  faEdit,
  faEye,
  faHome,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from "@themesberg/react-bootstrap";
import { Tag, Tooltip } from "antd";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
// import { section } from "app/data/section";
//data
import { Routes } from "app/routes";
import { clientURL } from "configuration";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalAddSection from "../ModalAddSection/ModalAddSection";
import ModalLecture from "../ModalLecture/ModalLecture";
import TableLectures from "../TableLectures/TableLectures";
import { getSectionById } from "app/core/apis/section";

const NewSectionPage = () => {
  let { idSection } = useParams();
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [lectures, setLectures] = useState([]);
  const [showLecture, setShowLecture] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentLecture, setCurrentLecture] = useState("");
  const modalConfirmDelete = useSelector((state) => state.confirmDelete);

  const handleSaveSection = async (e) => {
    e.preventDefault();
    const section = {
      ...data,
      title: title,
      slug: slug,
      description: e.target.description.value.trim(),
      isPublic: e.target.isPublic[0].checked ? "Public" : "Private",
      lectures: lectures,
    };
    //call API
  };

  useEffect(() => {
    setSlug(generatorSlug(title.trim()));
  }, [title]);

  const generatorSlug = (title) => {
    if (title === "") {
      return "";
    } else {
      return "/section/" + title?.toLowerCase().replaceAll(" ", "-");
    }
  };

  const fetchSectionByID = async () => {
    try {
      const response = await getSectionById(idSection);
      if (response.status === 200) {
        setData(response?.data?.topicSection?.[0]);
        setTitle(response?.data?.topicSection?.[0]?.title);
        setSlug(response?.data?.topicSection?.[0]?.slug);
        setLectures(response?.data?.topicSection?.[0]?.lessons);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    (async () => await fetchSectionByID())();
  }, []);

  const handleCancelAddNewEdit = () => {
    window.location = "/section-management";
  };

  dispatch(
    updateModalInfo({
      title: "Confirm delete this lecture",
      body: `Are you sure to delete this lecture ?
        This modified changes will not saved and you can't rollback`,
    })
  );

  const handleDeleteLecture = async () => {
    try {
    } catch (error) {
      alert(error);
    }
  };

  const deleteLecture = React.useCallback(
    (id) => () => {
      setCurrentLecture(id);
      dispatch(toggleShowModal({ show: true }));
    },
    []
  );

  const editLecture = React.useCallback(
    (id) => () => {
      setCurrentLecture(id);
      setShowLecture(true);
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        field: "slug",
        headerName: "Slug",
        type: "actions",
        align: "left",
        getActions: (params) => {
          return [
            <Tooltip title={params.row.slug} color={"#108ee9"} key={"#108ee9"}>
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={clientURL + params.row.slug}
              >
                {params.row.slug}
              </a>
            </Tooltip>,
          ];
        },
      },
      {
        field: "tablesOfContent",
        type: "actions",
        headerName: "Total of Lectures",
        getActions: (params) => {
          return [
            <span className="text-center">
              {params.row?.tablesOfContent.length}
            </span>,
          ];
        },
      },
      {
        field: "title",
        type: "actions",
        align: "left",
        headerName: "Title of Lecture",
        getActions: (params) => {
          return [
            <Tooltip title={params.row.id} color={"#108ee9"} key={"#108ee9"}>
              {params.row.id}
            </Tooltip>,
          ];
        },
      },
      {
        field: "dateCreated",
        type: "actions",
        headerName: "Date created",
        getActions: (params) => {
          return [
            <span className="text-center">
              {new Date(params.row.dateCreated).toLocaleDateString()}
            </span>,
          ];
        },
      },
      {
        field: "isPublic",
        type: "actions",
        headerName: "Status",
        getActions: (params) => {
          return [
            <Tag
              color={
                params.row.isPublic === "Public" ? "success" : "processing"
              }
            >
              {params.row.isPublic}
            </Tag>,
          ];
        },
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={deleteLecture(params.id)}
              label="Delete"
            />,
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faEye} className="me-2" />}
              label="View Details"
              showInMenu
              onClick={editLecture(params.id)}
            />,
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faEdit} className="me-2" />}
              label="Edit"
              showInMenu
              onClick={editLecture(params.id)}
            />,
          ];
        },
      },
    ],
    [deleteLecture, editLecture]
  );

  const fetchLecturesByIdSection = async () => {};

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
        setLectures={setLectures}
        lectures={lectures}
        show={showLecture}
        selectedLecture={currentLecture}
        handleClose={() => {
          setCurrentLecture("");
          setShowLecture(false);
        }}
      />
      <Form onSubmit={handleSaveSection}>
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
              Below tables will shown all of course in your website and some
              information about them.
            </p>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Button className="mx-2" type="submit">
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
            <Card.Body className="pt-0 my-4">
              <Row>
                <Col lg={7}>
                  <Form.Group
                    className={"form-group mb-3"}
                    as={Col}
                    controlId="formTitle"
                  >
                    <Form.Label>Title</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        name="title"
                        type="text"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className={"form-group mb-3"}
                    as={Col}
                    controlId="formTitle"
                  >
                    <Form.Label>Slug</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={slug}
                        readOnly
                        placeholder="Enter slug"
                        name="slug"
                        type="text"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className={"form-group error mb-3"}
                    controlId="formDescription"
                  >
                    <Form.Label>Description</Form.Label>
                    <InputGroup>
                      <Form.Control
                        defaultValue={
                          data?.description !== undefined
                            ? data?.description
                            : ""
                        }
                        placeholder="Enter description"
                        name="description"
                        as="textarea"
                        rows={5}
                      />
                    </InputGroup>
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
                        {data?.isPublic !== undefined &&
                        data?.isPublic === "Public" ? (
                          <>
                            <Form.Check
                              inline
                              label="Public"
                              name="isPublic"
                              defaultChecked
                              type="radio"
                              id={`inline-radio-3`}
                            />
                            <Form.Check
                              inline
                              name="isPublic"
                              label="Private"
                              type="radio"
                              id={`inline-radio-4`}
                            />
                          </>
                        ) : (
                          <>
                            <Form.Check
                              inline
                              label="Public"
                              name="isPublic"
                              type="radio"
                              id={`inline-radio-3`}
                            />
                            <Form.Check
                              inline
                              defaultChecked
                              name="isPublic"
                              label="Private"
                              type="radio"
                              id={`inline-radio-4`}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formDescription">
                  <div className="d-flex justify-content-between my-3">
                    <Form.Label
                      style={{ lineHeight: "36px", fontSize: "20px" }}
                    >
                      Lectures List
                    </Form.Label>
                    <Button
                      className="mx-2"
                      onClick={() => setShowLecture(true)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
                      New Lecture
                    </Button>
                  </div>

                  <TableLectures
                    title={columns}
                    data={lectures !== "" ? data.lectures : []}
                    handleShow={handleShow}
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Form>
    </>
  );
};

export default NewSectionPage;
