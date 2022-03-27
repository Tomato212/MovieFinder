import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import postRequest from "../helpers/postRequest.js";
import "../css/Table.css";

// TODO: Page loading with spinner
// https://mui.com/components/data-grid/selection/#usage-with-server-side-pagination

function handleTitleButtonClick(title) {
  const postRequestParams = {
    url: "/WikiSearch",
    searchTitle: title,
  };
  postRequest(postRequestParams, openLinkInNewTab);
}

function openLinkInNewTab(URL) {
  if (URL.length !== 0) {
    window.open(URL);
  } else {
    window.alert(
      "Did not find any article about the selected title on Wikipedia! \nPlease try another one."
    );
  }
}

const columns = [
  {
    field: "name",
    headerName: "Title",
    width: 500,
    align: "left",
    headerAlign: "center",
    renderCell: (params) => {
      const onClick = (e) => {
        handleTitleButtonClick(params.row.name);
      };
      return (
        <Button variant="string" onClick={onClick} className="titleButton">
          {params.row.name}
        </Button>
      );
    },
  },
  {
    field: "genres",
    headerName: "Genres",
    sortable: false,
    width: 400,
    align: "left",
    headerAlign: "center",
    // Genres are stored in additional array. This mapping creates one string from it.
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
    width: 98,
    align: "center",
    headerAlign: "center",
  },
];

export default function Table(props) {
  // const [pageSize, setRowsPerPage] = React.useState(10);

  return (
    <div className="tableSection">
      <DataGrid
        hideFooterSelectedRowCount={true}
        autoHeight={true}
        rows={props.items}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        showCellRightBorder={true}
        // TODO: paginationMode="server"
      />
    </div>
  );
}
