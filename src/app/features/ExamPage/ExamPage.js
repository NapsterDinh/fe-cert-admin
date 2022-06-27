import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button } from "@themesberg/react-bootstrap";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { deleteExam, getAllExam } from "app/core/apis/exam";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalAddNewExamAdmin from "./ModalAddNewExamAdmin/ModalAddNewExamAdmin";
import ModalViewDetailExam from "./ModalViewDetailExam/ModalViewDetailExam";
import TablesExam from "./TablesExam/TablesExam";

const ExamPage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentQuestion, setCurrentQuestion] = useState("");

  dispatch(
    updateModalInfo({
      title: "Confirm delete this exam",
      body: `Are you sure to delete this exam ?
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
        openNotificationWithIcon("success", "Delete exam successfully");
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
          response.data.exam
            .map((item) => ({
              ...item,
              id: item._id,
              key: item._id,
              total_of_questions: item?.questions?.length,
            }))
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
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
      <ModalViewDetailExam
        show={showDetail}
        handleClose={() => {
          setCurrentQuestion("");
          setShowDetail(false);
        }}
        item={currentQuestion}
      />
      <ModalConfirmDelete
        handleSubmit={handleDeleteExam}
        handleClose={() => dispatch(toggleShowModal({ show: false }))}
        {...modalConfirmDelete}
      />
      <ModalAddNewExamAdmin
        show={show}
        handleClose={handleClose}
        fetchAllExam={fetchAllExam}
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
            <Breadcrumb.Item active>{Routes.ExamPage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.ExamPage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={() => handleShow()}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Exam
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <TablesExam
          deleteExam={deleteUser}
          editExam={editQuestion}
          data={data}
          showDetail={(item) => {
            setCurrentQuestion(item);
            setShowDetail(true);
          }}
          handleShow={handleShow}
        />
      </div>
    </>
  );
};

export default ExamPage;
