import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Breadcrumb,
} from "@themesberg/react-bootstrap";
import {
  faHome,
  faAngleDoubleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
//components
import Actions from "app/base/components/Actions";
import { ModalTutorial } from "app/base/components/Modal";
//data
import { Routes } from "app/routes";
import { titleModule } from "app/data/titleTable";
import { dataModule } from 'app/data/tables'
//pages
import { TutorialTable } from "app/base/components/Tables";

const DetailModule = () => {
  const [dataTable, setDataTable] = useState([]);
  const [columns, setColumns] = useState([]);
  const [show, setShow] = useState(false);

  const history = useHistory()
  const location = useLocation()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dataModule.map((item, index) => (item.action = <Actions key={index} />));
    setColumns(titleModule);
    setDataTable(dataModule);
  }, []);

  return (
    <>
      <ModalTutorial show={show} handleClose={handleClose}/>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item >
            <Breadcrumb.Item onClick={() => history.push('/module')}>{Routes.ModulePage.name}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{Routes.DetailModule.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{Routes.ModulePage.name}</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some
            information about them.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2" onClick={() => history.push(`${location.pathname}/create`)}>
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
        <TutorialTable transactions={dataTable} title={columns} handleShow={handleShow}/>
      </div>
    </>
  );
};

export default DetailModule;
