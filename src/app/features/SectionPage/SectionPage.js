import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button } from "@themesberg/react-bootstrap";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import { openNotificationWithIcon } from "app/base/components/Notification";
import {
  getAllSection as getAllSectionAPI,
  deleteSection as deleteSectionAPI,
} from "app/core/apis/section";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalAddNewSection from "./ModalAddNewSection/ModalAddNewSection";
import TableSection from "./TablesSection/TablesSection";
import { getAllTopic } from "app/core/apis/topic";
const SectionPage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [topic, setTopic] = React.useState([]);
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
      const response = await deleteSectionAPI({
        _id: currentSection,
      });
      if (response.status === 200) {
        await getAllSection();
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("success", "Delete section successfully");
      } else {
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("failed", "Delete section failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteSection = (id) => {
    setCurrentSection(id);
    dispatch(toggleShowModal({ show: true }));
  };

  const editSection = (id) => {
    window.location = `/section-management/${id}`;
  };

  const getAllSection = async () => {
    try {
      const response = await getAllSectionAPI();
      if (response.status === 200) {
        setData(
          response?.data?.topicSection
            ?.map((item) => ({
              ...item,
              id: item._id,
              key: item._id,
              total_of_lessons: item.lessons.length,
              topic: item?.topic?.title,
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
      await getAllSection();
      try {
        const response2 = await getAllTopic();
        setTopic(response2?.data?.topic);
      } catch (error) {}
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
        topic={topic}
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
          deleteSection={deleteSection}
          editSection={editSection}
          data={data?.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )}
        />
      </div>
    </>
  );
};

export default SectionPage;
