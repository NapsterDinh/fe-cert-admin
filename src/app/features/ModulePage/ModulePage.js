import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Breadcrumb,
} from "@themesberg/react-bootstrap";
import {
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
//components
import Actions from "app/base/components/Actions";
import {ModalModule} from "app/base/components/Modal";
//data
import { Routes } from "app/routes";
import { titleModule } from "app/data/titleTable";
import { dataModule } from 'app/data/tables'
//pages
import { ModuleTable } from "app/base/components/Tables";

const ModulePage = () => {
  const [dataTable, setDataTable] = useState([]);
  const [columns, setColumns] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dataModule.map((item, index) => (item.action = <Actions key={index} />));
    setColumns(titleModule);
    setDataTable(dataModule);
  }, []);

  return (
    <>
      <ModalModule show={show} handleClose={handleClose}/>
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
              New Task
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
      </div>
    </>
  );
};

export default ModulePage;
