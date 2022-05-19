import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Card} from '@themesberg/react-bootstrap';
import './TableExam.css'


export const TableExam = ({ data, title, handleShow }) => {
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
              '.MuiDataGrid-columnHeader:nth-child(2)': {
                flexBasis: '10%!important',
              },
              '.MuiDataGrid-columnHeader:nth-child(3)': {
                flexBasis: '10%!important',
              },
              '.MuiDataGrid-columnHeader:nth-child(4)': {
                flexBasis: '30%!important',
              },
              '.MuiDataGrid-columnHeader:nth-child(5)': {
                flexBasis: '20%!important',
              },
              '.MuiDataGrid-columnHeader:nth-child(6)': {
                flexBasis: '10%!important',
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
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(2)': {
                flexBasis: '10%!important',
              },
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(3)': {
                flexBasis: '10%!important',
              },
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(4)': {
                flexBasis: '30%!important',
              },
              '.MuiDataGrid-row .MuiDataGrid-cell:nth-child(5)': {
                flexBasis: '20%!important',
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

export default TableExam;


