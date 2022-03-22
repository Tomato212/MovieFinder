import "./App.css";
import React, { useState } from "react";
import Table from "./components/Table";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const SearchTextField = styled(TextField)({
  "& label": {
    color: "#950101",
  },
  "& label.Mui-focused": {
    color: "#FF0000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3D0000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#3D0000",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "#950101",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF0000",
    },
  },
});

function App() {
  const [searchFormInput, setSearchFormInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    formSubmit(searchFormInput);
  };

  async function formSubmit(formData) {
    const data2 = await fetch("/movies", {
      //extract url
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{
        "formData": "${formData}"
      }`,
    })
      .then((response) => response.json())
      .then((response) => updateMovieList(response));
    setLoading(false);
  }

  function updateMovieList(movieList) {
    setMovies(movieList);
  }

  function handleInputChange(event) {
    const newValue = event.target.value;
    setSearchFormInput(newValue);
  }

  return (
    <div className="container">
      <h1>Movie Finder</h1>
      <form onSubmit={handleSubmit} id="search-form">
        <Box
          noValidate
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "2fr 1fr" },
            gap: 2,
            width: 700,
            margin: "auto",
          }}
        >
          <SearchTextField
            id="movie-search-field"
            name="searchFormInput"
            label="Title of the movie"
            value={searchFormInput}
            onChange={handleInputChange}
            autoComplete="off"
            sx={{ input: { color: "red" } }}
          />
          <Button
            variant="contained"
            type="submit"
            className="searchButton"
            sx={{
              width: 200,
              backgroundColor: "#3D0000",
              boxSizing: "content-box",
              fontFamily: "Limelight",
              color: "#FF0000",
              fontSize: 20,
              fontWeight: 400,

              "&:hover": {
                backgroundColor: "#950101",
                color: "#000000",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </form>

      {loading ? (
        <LinearProgress color="inherit" />
      ) : movies.length === 0 ? (
        <React.Fragment />
      ) : (
        <Table
          items={movies}
          sx={{
            width: 300,
            color: "#3D0000",
            "& .MuiSlider-thumb": {
              borderRadius: "1px",
              color: "#3D0000",
            },
          }}
        />
      )}
    </div>
  );
}

export default App;
