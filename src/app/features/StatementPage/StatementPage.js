import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button } from "@themesberg/react-bootstrap";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { deleteExam, getAllExam } from "app/core/apis/exam";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import TablesStatement from "./TablesStatement/TablesStatement";

const StatementPage = () => {
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

  const handleDeleteExam = async () => {
    try {
      const response = await deleteExam({
        _id: currentQuestion,
      });
      if (response.status === 200) {
        await fetchAllExam();
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("success", "Delete service successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = (id) => {
    setCurrentQuestion(id);
    dispatch(toggleShowModal({ show: true }));
  };

  const editQuestion = (id) => {
    window.location = `/exam-management/${id}`;
  };

  const fetchAllExam = async () => {
    try {
      const response = await getAllExam("exam");
      if (response.status === 200) {
        setData(
          response.data.exam.map((item) => ({
            ...item,
            id: item._id,
            key: item._id,
            total_of_questions: item?.questions?.length,
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
            <Breadcrumb.Item active>{Routes.StatementPage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.StatementPage.name}</h4>
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
        <TablesStatement
          deleteExam={deleteUser}
          editExam={editQuestion}
          data={data}
          handleShow={handleShow}
        />
      </div>
    </>
  );
};

export default StatementPage;
