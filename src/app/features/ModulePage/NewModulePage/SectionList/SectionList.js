import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "@themesberg/react-bootstrap";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import { openNotificationWithIcon } from "app/base/components/Notification";
import { deleteSection as deleteSectionAPI } from "app/core/apis/section";
import TableSection from "app/features/SectionPage/TablesSection/TablesSection";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalAddNewSection from "app/features/SectionPage/ModalAddNewSection/ModalAddNewSection";
const SectionList = ({ sections }) => {
  const [show, setShow] = useState(false);
  const [topic, setTopic] = useState([]);
  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentSection, setCurrentSection] = useState("");

  const handleDeleteSection = async () => {
    try {
      const response = await deleteSectionAPI({
        _id: currentSection,
      });
      if (response.status === 200) {
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
    dispatch(
      updateModalInfo({
        title: "Confirm delete this section",
        body: `Are you sure to delete this section ?
                This modified changes will not saved and you can't rollback`,
      })
    );
    setCurrentSection(id);
    dispatch(toggleShowModal({ show: true }));
  };

  const editSection = (id) => {
    window.location = `/section-management/${id}`;
  };

  return (
    <>
      <ModalConfirmDelete
        handleSubmit={handleDeleteSection}
        handleClose={() => dispatch(toggleShowModal({ show: false }))}
        {...modalConfirmDelete}
      />
      <ModalAddNewSection topic={topic} show={show} handleClose={handleClose} />
      <Form.Group className="mb-3" controlId="formDescription">
        <div className="d-flex justify-content-between my-3">
          <Form.Label style={{ lineHeight: "36px", fontSize: "20px" }}>
            Sections List
          </Form.Label>
          <Button className="mx-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Section
          </Button>
        </div>

        <TableSection
          data={sections?.map((item) => ({
            ...item,
            id: item._id,
            key: item._id,
          }))}
          deleteSection={deleteSection}
          editSection={editSection}
        />
      </Form.Group>
    </>
  );
};

export default SectionList;
