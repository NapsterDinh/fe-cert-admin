import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button, ButtonGroup, Card } from "@themesberg/react-bootstrap";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
//data
import { Routes } from "app/routes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal } from "store/confirmDeleteReducer";
import TableDragDrop from "./TableLessons/TableLessons";

const dataSet = [
  {
    _id: "121",
    title: "Logical Operations",
    topic: {
        _id: '123',
        title: 'Topic1'
    },
    slug: "/logical-operations",
    createdAt: "2022/01/21 12:33:33",
    updatedAt: "2022/01/21 12:33:33",
    status: "Public",
  },
  {
    _id: "122",
    title: "BNF",
    topic: {
        _id: '123',
        title: 'Topic1'
    },
    slug: "/bnf",
    createdAt: "2022/01/21 12:33:33",
    updatedAt: "2022/01/21 12:33:33",
    status: "Public",
  },
  {
    _id: "123",
    title: "Reverse Polish Notation",
    topic: {
        _id: '123',
        title: 'Topic1'
    },
    slug: "/revers-polish-notation",
    createdAt: "2022/01/21 12:33:33",
    updatedAt: "2022/01/21 12:33:33",
    status: "Public",
  },
  {
    _id: "124",
    title: "Quiz",
    slug: "/information-and-logic-quiz",
    topic: {
        _id: '123',
        title: 'Topic1'
    },
    createdAt: "2022/01/21 12:33:33",
    updatedAt: "2022/01/21 12:33:33",
    status: "Public",
  },
];
const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "tile",
  },
  {
    Header: "Slug",
    accessor: "slug",
  },
  {
    Header: "Date create",
    accessor: "createdAt",
  },
  {
    Header: "",
    accessor: "action",
  },
];
const LessonsPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  return (
    <>
      {/* <ModalAddNewQuestion
        show={show}
        handleClose={handleClose}
      /> */}
      <ModalConfirmDelete
        handleClose={() => dispatch(toggleShowModal({ show: false }))}
        {...modalConfirmDelete}
      />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{Routes.LessonsPage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.LessonsPage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={() => window.location = '/lessons-management/add'}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Lesson
          </Button>
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Card
          border="light"
          className="table-wrapper table-responsive shadow-sm"
        >
          <Card.Body className="pt-0">
            <div style={{ height: 632, width: "100%" }}>
              <TableDragDrop columns={columns} dataSet={dataSet} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default LessonsPage;
