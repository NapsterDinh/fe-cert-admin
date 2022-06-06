import {
  faEdit,
  faEye,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Breadcrumb, Button } from "@themesberg/react-bootstrap";
import { Tag, Tooltip } from "antd";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalAddNewSection from "./ModalAddNewSection/ModalAddNewSection";
import TableSection from "./TablesSection/TablesSection";
import { getAllSection as getAllSectionAPI, deleteSection } from "app/core/apis/section";
import { openNotificationWithIcon } from "app/base/components/Notification";

const SectionPage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentSection, setCurrentSection] = useState("");

  dispatch(
    updateModalInfo({
      title: "Confirm delete this section",
      body: `Are you sure to delete this section ?
            This modified changes will not saved and you can't rollback`,
    })
  );

  const handleDeleteSection = async () => {
    try {
      const response = await deleteSection({
        _id: currentSection,
      });
      if (response.status === 200) {
        await getAllSection();
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("success", "Delete section successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = React.useCallback(
    (id) => () => {
      setCurrentSection(id);
      dispatch(toggleShowModal({ show: true }));
    },
    []
  );

  const editSection = React.useCallback(
    (id) => () => {
      window.location = `/section-management/${id}`;
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "actions",
        align: "left",
        getActions: (params) => {
          return [
            <Tooltip title={params.row.id} color={"#108ee9"} key={"#108ee9"}>
              {params.row.id}
            </Tooltip>,
          ];
        },
      },
      {
        field: "location",
        type: "string",
        headerName: "Location",
      },
      {
        field: "title",
        type: "string",
        headerName: "Title of Exam",
      },
      {
        field: "eventDate",
        type: "actions",
        headerName: "Event Date",
        getActions: (params) => {
          return [
            <span className="text-center">
              {new Date(params.row.eventDate).toLocaleDateString()}
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
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={deleteUser(params.id)}
            label="Delete"
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faEye} className="me-2" />}
            label="View Details"
            showInMenu
            onClick={editSection(params.id)}
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faEdit} className="me-2" />}
            label="Edit"
            showInMenu
            onClick={editSection(params.id)}
          />,
        ],
      },
    ],
    [deleteUser]
  );

  const getAllSection = async () => {
    try {
      const response = await getAllSectionAPI();
      if (response.status === 200) {
        setData(
          [...response?.data?.topicSection]?.map((item) => ({
            ...item,
            id: item._id,
          }))
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await getAllSection();
    })();
  }, []);

  return (
    <>
      <ModalConfirmDelete
        handleSubmit={handleDeleteSection}
        handleClose={() => dispatch(toggleShowModal({ show: false }))}
        {...modalConfirmDelete}
      />
      <ModalAddNewSection
        show={show}
        handleClose={handleClose}
        getAllSection={getAllSection}
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
            <Breadcrumb.Item active>{Routes.SectionPage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.SectionPage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={() => handleShow()}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Section
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <TableSection
          title={columns}
          deleteUser={deleteUser}
          data={data}
          handleShow={handleShow}
        />
      </div>
    </>
  );
};

export default SectionPage;
