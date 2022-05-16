
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';

import { PageTrafficTable, RankingTable } from "app/base/components/Tables";

const BootstrapTables = () => {
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>Course Management</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Course List</h4>
          <p className="mb-0">
            Below tables will shown all of course in your website and some information about them
          </p>
        </div>
      </div>

      <PageTrafficTable />
      <RankingTable />
    </>
  );
}
 
export default BootstrapTables;

