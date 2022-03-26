import "./App.css";
import React, { useState } from "react";
import Table from "./components/Table";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
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
    const data2 = await fetch("/SearchMovies", {
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
      .then((response) => updateMovieList(response))
      .catch((error) => {
        console.error("Error while asking search results from server:", error);
      });
    setLoading(false);
  }

  function updateMovieList(movieList) {
    setMovies(movieList);
  }

  function handleInputChange(event) {
    const newValue = event.target.value;
    setSearchFormInput(newValue);
  }

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

  const tableTheme = createTheme({
    overrides: {
      MuiTableRow: {
        hover: {
          "&:hover": {
            backgroundColor: "rgba(33, 150, 243, 0.25) !important",
          },
        },
      },
    },
  });

  return (
    <div className="container">
      <h1>Movie Finder</h1>
      <form onSubmit={handleSubmit} id="search-form">
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          noValidate
          sx={{
            gap: 2,
            width: 700,
            mx: "auto",
            pb: 6,
          }}
        >
          <Box gridColumn="span 2">
            <SearchTextField
              id="movie-search-field"
              name="searchFormInput"
              label="Title of the movie"
              value={searchFormInput}
              onChange={handleInputChange}
              autoComplete="off"
              fullWidth
              sx={{
                input: { color: "red", height: "100%" },
              }}
            />
          </Box>

          <Box gridColumn="span 1">
            <Button
              variant="contained"
              type="submit"
              className="searchButton"
              disabled={loading}
              sx={{
                backgroundColor: "#3D0000",
                boxSizing: "content-box",
                fontFamily: "Limelight",
                color: "#FF0000",
                fontSize: 20,
                fontWeight: 400,
                padding: 0,
                textTransform: "none",
                width: "100%",
                height: "100%",

                "&:hover": {
                  backgroundColor: "#950101",
                  color: "#000000",
                },
                "&:disabled": {
                  backgroundColor: "#950101",
                  color: "#000000",
                },
              }}
            >
              Search
            </Button>
          </Box>
          <Box gridColumn="span 3" sx={{ height: 5 }}>
            {loading ? <LinearProgress color="inherit" /> : <React.Fragment />}
          </Box>
        </Box>
      </form>
      {loading ? (
        <React.Fragment />
      ) : movies.length === 0 ? (
        <React.Fragment />
      ) : (
        <ThemeProvider theme={tableTheme}>
          <Table
            items={movies}
            options={options}
            rowClick={(event, rowData) => {
              console.log("hahoooo");
            }}
            sx={{
              width: 300,
              color: "#3D0000",
              "& .MuiSlider-thumb": {
                borderRadius: "1px",
                color: "#3D0000",
              },
            }}
          />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
