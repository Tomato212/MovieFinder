import React, { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import postRequest from "../helpers/postRequest";

import { styled } from "@mui/material/styles";

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

export default function Form(props) {
  const [searchFormInput, setSearchFormInput] = useState("");

  const handleSubmit = (event) => {
    props.setLoading(true);
    event.preventDefault();
    formSubmit(searchFormInput);
  };

  function handleInputChange(event) {
    const newValue = event.target.value;
    setSearchFormInput(newValue);
  }

  async function formSubmit(formData) {
    const postRequestParams = {
      url: "/SearchMovies",
      searchTitle: formData,
    };
    postRequest(postRequestParams, updateMovieList, props.setLoading);
  }

  function updateMovieList(movieList) {
    if (movieList.length !== 0) {
      props.setMovies(movieList);
    } else {
      window.alert(
        "Did not find any movies with given title. \nPlease try another one."
      );
      props.setMovies([]); //init. movie list
    }
  }

  return (
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
            disabled={props.loading}
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
          {props.loading ? (
            <LinearProgress color="inherit" />
          ) : (
            <React.Fragment />
          )}
        </Box>
      </Box>
    </form>
  );
}
