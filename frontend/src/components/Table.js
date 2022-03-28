import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import RelatedConditionalTableDiv from "./conditionalTableClass.js";
import postRequest from "../helpers/postRequest.js";
import "../css/Table.css";

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

const columnsIncludingRelated = [
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
    field: "similar",
    headerName: "Related movies",
    width: 700,
    headerAlign: "center",
    align: "left",
    sortable: false,
    valueGetter: (params) => {
      let result;
      if (params.row.similar.length !== 0) {
        result = params.row.similar.map((related) => {
          return " " + related.name;
        });
      } else {
        result = "No related movie.";
      }
      return result;
    },
  },
  {
    field: "genres",
    headerName: "Genres",
    sortable: false,
    width: 200,
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

const columnsWithoutRelated = [
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
  return (
    <RelatedConditionalTableDiv
      relatedSwitch={props.relatedSwitch}
      children={
        <DataGrid
          hideFooterSelectedRowCount={true}
          autoHeight={true}
          rows={props.items}
          columns={
            props.relatedSwitch
              ? columnsIncludingRelated
              : columnsWithoutRelated
          }
          pageSize={20}
          rowsPerPageOptions={[20]}
          showCellRightBorder={true}
          // TODO: paginationMode="server"
        />
      }
    />
  );
}
