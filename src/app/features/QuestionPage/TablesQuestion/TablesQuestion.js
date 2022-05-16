import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import './TableQuestion.css'

import { Routes } from "app/routes";

export const TablesQuestion = ({ data, title, handleShow }) => {
  const totaldata = data.length;
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <div style={{ height: 632, width: '100%' }}>
          <DataGrid
            sx={{
              '.css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
                width: '100%'
              },
              '.MuiDataGrid-columnHeader': {
                width: 'auto!important',
                maxWidth: 'none!important',
                minWidth: 'auto!important',
                flex: `0 0 15%;`
              },
              '.MuiDataGrid-columnHeader:nth-child(1)': {
                flexBasis: '5%!important',
              },
              '.MuiDataGrid-columnHeader:nth-child(4)': {
                flexBasis: '40%!important',
              },
              '.MuiDataGrid-columnHeader:nth-child(6)': {
                flexBasis: '8%!important',
              },
              '.MuiDataGrid-row .MuiDataGrid-cell': {
                flex: `0 0 15%;`,
                minWidth: 'auto!important',
                maxWidth: 'none!important;'
              },
              '.MuiDataGrid-row, .MuiDataGrid-virtualScrollerRenderZone': {
                width: '100%'
              },
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(1)': {
                flexBasis: '5%!important',
              },
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(4)': {
                flexBasis: '40%!important',
              },
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(6)': {
                flexBasis: '10%!important',
              },
              '.css-pdct74-MuiTablePagination-selectLabel, .css-levciy-MuiTablePagination-displayedRows': {
                marginBottom: '0px',
              },
            }}
            rows={data}
            columns={title}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 30, 40]}
            pagination
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TablesQuestion;


