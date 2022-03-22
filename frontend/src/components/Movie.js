import React, { useEffect, useState } from "react";
import Table from "./Table.js";
import LinearProgress from "@mui/material/LinearProgress";

function Movie() {
  // useEffect(() => {
  //   fecthItems();
  // }, []);

  // const [loading, setLoading] = useState(false);

  // const [items, setItems] = useState([]);

  // const fecthItems = async () => {
  //   setLoading(true);
  //   const data = await fetch("/movies");
  //   const items = await data.json();
  //   setItems(items);
  //   setLoading(false);
  // };

  return (
    <React.Fragment>
      {/* {loading ? (
        <LinearProgress color="inherit" />
      ) : (
        <Table
          items={items}
          sx={{
            width: 300,
            color: "#3D0000",
            "& .MuiSlider-thumb": {
              borderRadius: "1px",
              color: "#3D0000",
            },
          }}
        />
      )} */}
    </React.Fragment>
  );
}

export default Movie;
