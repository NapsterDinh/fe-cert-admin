import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Card } from "@themesberg/react-bootstrap";

export const TableModule = ({ data, title, handleShow }) => {
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <div style={{ height: 632, width: "100%" }}>
          <DataGrid
            sx={{
              ".MuiDataGrid-columnHeaderTitle.css-1jbbcbn-MuiDataGrid-columnHeaderTitle":
                {
                  fontWeight: "700;",
                },
              ".css-1s0hp0k-MuiDataGrid-columnHeadersInner": {
                width: "100%",
              },
              ".MuiDataGrid-columnHeader": {
                width: "auto!important",
                maxWidth: "none!important",
                minWidth: "auto!important",
                flex: `0 0 15%;`,
              },
              ".MuiDataGrid-columnHeader:nth-of-type(1)": {
                flexBasis: "5%!important",
              },
              ".MuiDataGrid-columnHeader:nth-of-type(2)": {
                flexBasis: "10%!important",
              },
              ".MuiDataGrid-columnHeader:nth-of-type(3)": {
                flexBasis: "25%!important",
              },
              ".MuiDataGrid-columnHeader:nth-of-type(4)": {
                flexBasis: "25%!important",
              },
              ".MuiDataGrid-columnHeader:nth-of-type(5)": {
                flexBasis: "10%!important",
              },
              ".MuiDataGrid-columnHeader:nth-of-type(6)": {
                flexBasis: "10%!important",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell": {
                flex: `0 0 15%;`,
                minWidth: "auto!important",
                maxWidth: "none!important;",
              },
              ".MuiDataGrid-row, .MuiDataGrid-virtualScrollerRenderZone": {
                width: "100%",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(1)": {
                flexBasis: "5%!important",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(2)": {
                flexBasis: "10%!important",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(3)": {
                flexBasis: "25%!important",
                justifyContent: "left",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(3) .MuiDataGrid-actionsCell":
                {
                  marginLeft: "10px",
                },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(4)": {
                flexBasis: "25%!important",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(5)": {
                flexBasis: "10%!important",
              },
              ".MuiDataGrid-row .MuiDataGrid-cell:nth-of-type(6)": {
                flexBasis: "10%!important",
              },
              ".css-pdct74-MuiTablePagination-selectLabel, .css-levciy-MuiTablePagination-displayedRows":
                {
                  marginBottom: "0px",
                },
            }}
            rows={data}
            columns={title}
            checkboxSelection
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TableModule;
