import * as React from "react";
import { DataGrid, GridApi } from "@mui/x-data-grid";
import { textAlign } from "@mui/system";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import "../App.css";

import WikiSearch from "../helpers/WikiSearch.js";

import Button from "@mui/material/Button";

// import {link} from "@mui"

//Page loading with spinner
// https://mui.com/components/data-grid/selection/#usage-with-server-side-pagination

async function getDetailsFromWikipedia(movieTitle) {
  const data2 = await fetch("/WikiSearch", {
    //extract url
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
      "queryWord": "${movieTitle}"
    }`,
  })
    .then((response) => response.json())
    .then((response) => openLinkInNewTab(response))
    .catch((error) => {
      console.error("Error while asking search results from server:", error);
    });
}

function openLinkInNewTab(URL) {
  window.open(URL, "_blank");
}

//WikiSearch(title);

// const StyledDataGrid = styled(DataGrid)({
//   "& .MuiTableRow-hover": {
//     backgroundColor: "#FFFFFF",
//   },
// });

const columns = [
  {
    field: "name",
    headerName: "Title",
    width: 500,
    align: "left",

    renderCell: (params) => {
      const onClick = (e) => {
        return getDetailsFromWikipedia(params.row.name);
      };
      return <Button onClick={onClick}>{params.row.name}</Button>;
    },
  },
  {
    field: "genres",
    headerName: "Genres",
    sortable: false,
    width: 400,
    align: "left",
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
        // sx={{
        //   border: 3,
        //   borderColor: "#3D0000",
        //   borderRadius: 0,
        //   // "& .MuiDataGrid-cell:hover": {
        //   //   backgroundColor: "3D0000",
        //   // },
        // }}
      />
    </div>
  );
}
