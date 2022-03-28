import React, { useState } from "react";
import Table from "./components/Table";
import Form from "./components/Form";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRelatedMovieSwitchChecked, setShowRelatedMovieSwitch] =
    useState(false);

  // For mui table options
  const options = {
    filterType: "checkbox",
    rowsPerPage: [3],
    rowsPerPageOptions: [1, 3, 5, 6],
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "OF",
      },
    },
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    },
  };

  return (
    <div className="container">
      <h1>Movie Finder</h1>
      <Form
        setMovies={setMovies}
        loading={loading}
        setLoading={setLoading}
        relatedSwitch={showRelatedMovieSwitchChecked}
        setRelatedSwitch={setShowRelatedMovieSwitch}
      />
      {!loading && movies.length !== 0 && (
        <Table
          items={movies}
          options={options}
          relatedSwitch={showRelatedMovieSwitchChecked}
        />
      )}
    </div>
  );
}

export default App;
