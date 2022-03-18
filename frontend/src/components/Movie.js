import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movie() {
  useEffect(() => {
    fecthItems();
  }, []);

  const [items, setItems] = useState([]);

  const fecthItems = async () => {
    const data = await fetch("/movies");
    const items = await data.json();
    setItems(items);
  };

  return (
    <React.Fragment>
      {items.map((item) => (
        <div>
          <p>{item.name}</p>
          <p>{item.msg}</p>
          <p>{item.score}</p>
        </div>
      ))}
    </React.Fragment>
  );
}

export default Movie;
