
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Accordion } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, FormCheck } from "@themesberg/react-bootstrap";

import { Routes } from "app/routes";
import { pageVisits, pageTraffic, pageRanking } from "../../data/tables";
import commands from "../../data/commands";

//utils
import { floorToBiggerNumber } from "../utils/method";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const ModuleTable = ({transactions, title}, handleShow) => {
  const totalTransactions = transactions.length;

  const history = useHistory()
  
  const TableRow = (item) => {
    const statusVariant = item.status === "Paid" ? "success"
      : item.status === "Due" ? "warning"
        : item.status === "Canceled" ? "danger" : "primary";
    
    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {item.id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {item.title}
          </span>
        </td>
        <td>
          <a className="fw-normal" href={item.slug}>
            {item.slug}
          </a>
        </td>
        <td>
          <span className="fw-normal">
            {item.numberOfLessons}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {item.dateCreated}
          </span>
        </td>
        <td>
          <span className={`fw-normal ${statusVariant}`}>
            {item.status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => history.push(`/module/${item.id}/tutorial`)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleShow()}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              {
                title.map(item => (
                  <th key={item.id} className="border-bottom">{item.name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {transactions.map((t,index) => <TableRow key={`transaction-${index}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const TutorialTable = ({transactions, title, handleShow}) => {
  const totalTransactions = transactions.length;

  const history = useHistory()
  const location = useLocation()
  
  const TableRow = (item) => {
    const statusVariant = item.status === "Paid" ? "success"
      : item.status === "Due" ? "warning"
        : item.status === "Canceled" ? "danger" : "primary";
    
    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {item.id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {item.title}
          </span>
        </td>
        <td>
          <a className="fw-normal" href={item.slug}>
            {item.slug}
          </a>
        </td>
        <td>
          <span className="fw-normal">
            {item.numberOfLessons}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {item.dateCreated}
          </span>
        </td>
        <td>
          <span className={`fw-normal ${statusVariant}`}>
            {item.status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleShow(item)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => history.push(`${location.pathname}/${item.id}/edit`)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              {
                title.map(item => (
                  <th key={item.id} className="border-bottom">{item.name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {transactions.map((t,index) => <TableRow key={`transaction-${index}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CourseTable = ({countRowShow, transactions}) => {
  const totalCourse = transactions.length;

  const [checkedAll, setCheckedAll] = useState(() => {
    const checkedObject = {
      "-1": false
    }
    transactions.map((item, index) => checkedObject[index] = false)
    return checkedObject
  })
  const [activePagination, setActivePagination] = useState(0)
  const [items, setItems] = useState(() => {
    if(countRowShow >= totalCourse)
    {
      return transactions
    }
    else
    {
      const temp = []
      for (let index = 0; index < countRowShow; index++) {
        temp.push(transactions[index])
      }
      return temp
    }
    
  })
  const [isActiveApply, setIsActiveApply] = useState(false)

  const handleChangeCheckbox = (e, index) => {
    const temp = {...checkedAll}
    if(index === -1 )
    {
      setCheckedAll(
        Object.keys(temp).map(item => checkedAll[item] = e.target.checked)
      )
    }
    else
    {
      temp[index] = e.target.checked
      const tempArray = Object.keys(temp).map(item => temp[item])
      temp["-1"] = !e.target.checked ? e.target.checked :
                                      tempArray.filter((item2, index) => item2 === e.target.checked && index !== tempArray.length-1).length 
                                                                            === (tempArray.length-1) && e.target.checked
      setCheckedAll(temp)
    }
    
  }

  const changePagination = (index) => {
    //cho nay se moi lan changePagination se call API 1 lan nen cho nay k can xu ly
    // con neu lam theo cach load 1 cuc data roi handle thi lam nhu sau
    const temp = []
    if(countRowShow*(index+1) < transactions.length)
    {
      for (let index2 = countRowShow*index; index2 < countRowShow*(index+1) ; index2++) {
        temp.push(transactions[index2])
      }
    }
    else
    {
      for (let index2 = countRowShow*index; index2 < transactions.length ; index2++) {
        temp.push(transactions[index2])
      }
    } 
    setItems(temp)
    setActivePagination(index)
  }

  useEffect(() => {
    const temp = {...checkedAll}
    Object.keys(temp).map(item => temp[item]).filter((item, index) => item = true && index !== -1)
    setIsActiveApply(Object.keys(temp).map(item => temp[item]).filter((item, index) => item = true && index !== -1).length > 0)
  }, [checkedAll])


  const TableRow = (props) => {
    const { index, checked, handleChangeCheckbox ,invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
    
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";
    
    return (
      <tr>
        <td>
          <FormCheck.Input className="me-2" checked={checked} onChange={(e) => handleChangeCheckbox(e, index)} />
        </td>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {subscription}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {dueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            ${parseFloat(price).toFixed(2)}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  const TableRowCollapse = (props) => {
    const { index, checked, handleChangeCheckbox ,invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
    
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";
    
    return (
      
        <Accordion.Item eventKey={index}>
          <Accordion.Header>
          <tr>
          <td>
              <FormCheck.Input className="me-2" checked={checked} onChange={(e) => handleChangeCheckbox(e, index)} />
            </td>
            <td>
              <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                {invoiceNumber}
              </Card.Link>
            </td>
            <td>
              <span className="fw-normal">
                {subscription}
              </span>
            </td>
            <td>
              <span className="fw-normal">
                {issueDate}
              </span>
            </td>
            <td>
              <span className="fw-normal">
                {dueDate}
              </span>
            </td>
            <td>
              <span className="fw-normal">
                ${parseFloat(price).toFixed(2)}
              </span>
            </td>
            <td>
              <span className={`fw-normal text-${statusVariant}`}>
                {status}
              </span>
            </td>
            <td>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="text-danger">
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            </tr>
          </Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </Accordion.Body>
        </Accordion.Item>
        
      
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
      <div className="d-flex mt-3 mb-3">
          <Col xs={7} md={5} lg={2} xl={3} className="d-flex">
            <Form.Select disabled={isActiveApply} aria-label="Default select example" className="select-action">
                <option>Bulk Action</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            <Button disabled={isActiveApply} variant="secondary" className="ms-3 btn btn-secondary btn-sm">Apply</Button>
          </Col>
        </div>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom"><FormCheck.Input checked={checkedAll["-1"]} className="me-2" onChange={(e) => handleChangeCheckbox(e, -1)}/></th>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Bill For</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Due Date</th>
              <th className="border-bottom">Total</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            <Accordion defaultActiveKey="0">
              {
                items.map((t, index) => <TableRowCollapse key={`transaction-${t.invoiceNumber}`} 
                                                        {...t} 
                                                        index={index}
                                                        checked={checkedAll[index]}
                                                        handleChangeCheckbox={handleChangeCheckbox}
                                                        />)
              }
            </Accordion>
          </tbody>
        </Table>
        <Card.Footer className={`px-3 border-0 d-lg-flex align-items-center justify-content-${countRowShow < totalCourse ? "between" : "end"}`}>
          {
            countRowShow < totalCourse &&
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                {
                  activePagination > 0 && 
                  <Pagination.Prev onClick={() => changePagination(activePagination-1)}>
                    Previous
                  </Pagination.Prev>
                }
                {
                  floorToBiggerNumber(transactions.length, countRowShow).map((item, index) => (
                    <Pagination.Item active={index === activePagination}
                    onClick={(e) => changePagination(index)}
                    >{index+1}</Pagination.Item>
                  ))
                }
                {
                  activePagination < floorToBiggerNumber(transactions.length, countRowShow).length -1 &&
                  <Pagination.Next onClick={() => changePagination(activePagination+1)}>
                    Next
                  </Pagination.Next>
                }
                
              </Pagination>
            </Nav>
          }
          <small className="fw-bold">
            Showing <b>{transactions.length < countRowShow*(activePagination+1) ? transactions.length : countRowShow*(activePagination+1)}</b> out of <b>{totalCourse}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
