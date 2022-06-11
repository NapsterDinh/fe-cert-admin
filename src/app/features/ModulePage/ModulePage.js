import {
  faEdit,
  faEye,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Breadcrumb, Button, ButtonGroup } from "@themesberg/react-bootstrap";
import { Tag, Tooltip } from "antd";
import { ModalModule } from "app/base/components/Modal/Modal";
import { openNotificationWithIcon } from "app/base/components/Notification";
import {
  getQuestionById,
  getAllTopic,
  deleteTopic as deleteTopicAPI,
} from "app/core/apis/topic";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import TableModule from "./TableModule/TableModule";

const ModulePage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const dispatch = useDispatch();
  const handleClose = () => {
    setCurrentTopic("");
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const [currentTopic, setCurrentTopic] = useState("");

  dispatch(
    updateModalInfo({
      title: "Confirm delete this topic",
      body: `Are you sure to delete this topic ?
            This modified changes will not saved and you can't rollback`,
    })
  );

  const handleDeleteTopic = async () => {
    try {
      const response = await deleteTopicAPI({
        _id: currentTopic,
      });
      if (response.status === 200) {
        await fetchAllTopic();
        dispatch(toggleShowModal({ show: false }));
        setCurrentTopic("");
        openNotificationWithIcon("success", "Delete exam successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteTopic = (id) => {
    setCurrentTopic(id);
    dispatch(toggleShowModal({ show: true }));
  };

  const editTopic = (id) => {
    setCurrentTopic(id);
    setShow(true);
  };

  const fetchAllTopic = async () => {
    try {
      const response = await getAllTopic();
      if (response.status === 200) {
        setData(
          response?.data?.topic?.map((item) => ({
            ...item,
            id: item._id,
            key: item._id,
            total_of_section: item?.sections?.length,
          }))
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    (async () => {
      await fetchAllTopic();
    })();
  }, []);

  return (
    <>
      <ModalModule
        currentTopic={currentTopic}
        show={show}
        getAllTopic={fetchAllTopic}
        handleClose={handleClose}
      />
      <ModalConfirmDelete
        handleSubmit={handleDeleteTopic}
        handleClose={() => {
          setCurrentTopic("");
          dispatch(toggleShowModal({ show: false }));
        }}
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
            <Breadcrumb.Item active>{Routes.ModulePage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.ModulePage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Topic
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <TableModule
          deleteTopic={deleteTopic}
          editTopic={editTopic}
          data={data}
        />
      </div>
    </>
  );
};

export default ModulePage;
