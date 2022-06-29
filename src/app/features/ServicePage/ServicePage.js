import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button } from "@themesberg/react-bootstrap";
import ModalConfirmDelete from "app/base/components/ModalConfirmDelete/ModalConfirmDelete";
import { openNotificationWithIcon } from "app/base/components/Notification";
import {
  deletePricing,
  getAllPricing,
  getAllAbilityPricing,
} from "app/core/apis/pricing";
//data
import { Routes } from "app/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowModal, updateModalInfo } from "store/confirmDeleteReducer";
import ModalAddNewService from "./ModalAddNewService/ModalAddNewService";
import TablesService from "./TablesService/TablesService";

const ServicePage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [abilitiesService, setAbilitiesService] = useState([]);

  const modalConfirmDelete = useSelector((state) => state.confirmDelete);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentService, setcurrentService] = useState("");

  dispatch(
    updateModalInfo({
      title: "Confirm delete this service",
      body: `Are you sure to delete this service ?
            This modified changes will not saved and you can't rollback`,
    })
  );

  const handleDeleteExam = async () => {
    try {
      console.log(currentService);
      const response = await deletePricing(currentService?._id);
      if (response.status === 200) {
        await fetchAllExam();
        dispatch(toggleShowModal({ show: false }));
        openNotificationWithIcon("success", "Delete service successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = (item) => {
    setcurrentService(item);
    dispatch(toggleShowModal({ show: true }));
  };

  const editQuestion = (item) => {
    setcurrentService(item);
    handleShow();
  };

  const fetchAllExam = async () => {
    try {
      const response = await getAllPricing();
      if (response.status === 200) {
        setData(
          Object.entries(response?.data?.pricing).map((item) => ({
            ...item[1],
            id: item[1]._id,
            key: item[1]._id,
            price:
              item[1]?.price?.$numberDecimal === undefined
                ? 0
                : item[1]?.price?.$numberDecimal,
            revenue:
              item[1]?.revenue?.$numberDecimal === undefined
                ? 0
                : item[1]?.revenue?.$numberDecimal,
          }))
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    (async () => {
      await fetchAllExam();
      const response = await getAllAbilityPricing();
      try {
        if (response.status === 200) {
          setAbilitiesService(response?.data?.ability);
        } else {
          console.log(response?.data?.msg);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <ModalConfirmDelete
        handleSubmit={handleDeleteExam}
        handleClose={() => dispatch(toggleShowModal({ show: false }))}
        {...modalConfirmDelete}
      />
      <ModalAddNewService
        show={show}
        handleClose={() => {
          setcurrentService("");
          handleClose();
        }}
        fetchAllExam={fetchAllExam}
        currentService={currentService}
        abilitiesService={abilitiesService?.map((t) => ({
          ...t,
          label: t.name,
          value: t._id,
        }))}
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
            <Breadcrumb.Item active>{Routes.ServicePage.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.ServicePage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={() => handleShow()}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Service
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <TablesService
          deleteExam={deleteUser}
          editExam={editQuestion}
          data={data}
          handleShow={handleShow}
        />
      </div>
    </>
  );
};

export default ServicePage;
