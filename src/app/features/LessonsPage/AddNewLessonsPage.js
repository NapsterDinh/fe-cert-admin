import {
  faAngleDoubleRight, faHome, faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button
} from "@themesberg/react-bootstrap";
import { Routes } from "app/routes";
import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";


const AddNewLessonPage = ({ placeholder }) => {
  const location = useLocation();
  const history = useHistory();
  const editor = useRef(null);
  const [content, setContent] = useState("");

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
            <Breadcrumb.Item
              onClick={() => history.push("/lessons-management")}
            >
              {Routes.LessonsPage.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                const pathname = location.pathname;
                history.push(pathname.replace("/add", ""));
              }}
            >
              Create new a new lesson
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Create a new lesson</h4>
          <p className="mb-0">
            Below is an editor which you can create content of tutorial
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button className="mx-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Save
          </Button>
          <Button variant="outline-primary" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddNewLessonPage;
