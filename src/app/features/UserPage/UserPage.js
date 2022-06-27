import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button } from "@themesberg/react-bootstrap";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { getAllUsers } from "app/core/apis/user";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import TablesUser from "./TablesUser/TablesUser";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentQuestion, setCurrentQuestion] = useState("");

  dispatch(
    updateModalInfo({
      title: "Confirm delete this service",
      body: `Are you sure to delete this service ?
            This modified changes will not saved and you can't rollback`,
    })
  );

  const fetchAllExam = async () => {
    try {
      const response = await getAllUsers();
      if (response.status === 200) {
        setData(
          response.data.users.map((item) => ({
            ...item,
            id: item._id,
          }))
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    (async () => {
      await fetchAllExam();
    })();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{Routes.UserPage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.UserPage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        {/* <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={() => handleShow()}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Service
          </Button>
        </div> */}
      </div>

      <div className="table-settings mb-4">
        <TablesUser data={data} handleShow={handleShow} />
      </div>
    </>
  );
};

export default UserPage;
