import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch,
  faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

//style
import "./CoursePage.scss"

//data
import transactions from "app/data/transactions"
//pages
import { CourseTable } from "app/base/components/Tables";

const CoursePage = () => {
  const [rangePagination, setRangePagination] = useState(transactions.length >= 10 ? 10 : transactions.length)
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>Course Management</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Course Management</h4>
          <p className="mb-0">Below tables will shown all of course in your website and some information about them.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={8} md={7} lg={4} xl={4} className="d-flex">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
            <Form.Select aria-label="Default select example" className="select-filter">
                <option>All</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
                <option value="3">Pending</option>
                <option value="4">Suspended</option>
            </Form.Select>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark"
                onClick={() => setRangePagination(2)}
                >Show
                {
                  rangePagination !== 10 && rangePagination !== 20 && rangePagination !== 30 
                  && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                }
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold"
                onClick={() => setRangePagination(10)}
                >10 
                {
                  rangePagination === 10 && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                }
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold"
                onClick={() => setRangePagination(20)}
                >20
                {
                  rangePagination === 20 && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                }
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold"
                onClick={() => setRangePagination(30)}
                >30
                {
                  rangePagination === 30 && <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                }
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <CourseTable countRowShow={rangePagination} transactions={transactions}/>
    </>
  );
}
 
export default CoursePage;
