import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { renderMatches } from "react-router";
import Table from "./Table.js";
import LinearProgress from "@mui/material/LinearProgress";

function Movie() {
  useEffect(() => {
    fecthItems();
  }, []);

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);

  const fecthItems = async () => {
    setLoading(true);
    const data = await fetch("/movies");
    const items = await data.json();
    setItems(items);
    setLoading(false);
  };

  return (
    <React.Fragment>
      {loading ? <LinearProgress color="inherit" /> : <React.Fragment />}
      {loading ? (
        <React.Fragment />
      ) : (
        <Table
          items={items}
          sx={{
            width: 300,
            color: "white",
            "& .MuiSlider-thumb": {
              borderRadius: "1px",
            },
          }}
        />
      )}
      {/* <Table
        // key={index}
        // id={item.id}
        items={items}
      /> */}
      {/* {items.map((item) => (
        <div>
          <p>{item.name}</p>
          <p>{item.genres[0].name}</p>
          <p>{item.score}</p>
        </div>
      ))} */}
    </React.Fragment>
  );
}

export default Movie;
