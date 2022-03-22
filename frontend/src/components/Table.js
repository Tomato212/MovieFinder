import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { textAlign } from "@mui/system";

const columns = [
  {
    field: "name",
    headerName: "Title",
    width: 500,
    align: "left",
  },
  {
    field: "genres",
    headerName: "Genres",
    sortable: false,
    width: 400,
    align: "left",
    valueGetter: (params) => {
      let result;
      if (params.row.genres.length !== 0) {
        result = params.row.genres.map((genre) => {
          return " " + genre.name;
        });
      } else {
        result = "No data";
      }
      return result;
    },
  },
  {
    field: "score",
    headerName: "Score",
    type: "number",
    width: 90,
    align: "center",
  },
];

export default function Table(props) {
  // const [pageSize, setRowsPerPage] = React.useState(10);

  return (
    <div
      style={{
        height: 1155,
        width: 1000,
        backgroundColor: "#950101",
        margin: "auto",
      }}
    >
      <DataGrid
        rows={props.items}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        sx={{
          border: 3,
          borderColor: "#3D0000",
          borderRadius: 0,
          "& .MuiDataGrid-cell:hover": {
            backgroundColor: "3D0000",
          },
        }}
      />
    </div>
  );
}
