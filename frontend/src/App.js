import React, { useState } from "react";
import Table from "./components/Table";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRelatedMovieSwitchChecked, setShowRelatedMovieSwitch] =
    useState(false);

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
        <Table items={movies} relatedSwitch={showRelatedMovieSwitchChecked} />
      )}
    </div>
  );
}

export default App;
