import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import SearchTextField from "./SearchTextField.js";
import postRequest from "../helpers/postRequest.js";
import "../css/Form.css";

export default function Form(props) {
  const [searchFormInput, setSearchFormInput] = useState("");

  const handleSubmit = (event) => {
    props.setLoading(true);
    event.preventDefault();
    formSubmit();
  };

  function handleRelatedSwitchChange(event) {
    const newState = event.target.checked;
    props.setRelatedSwitch(newState);
  }

  function handleInputChange(event) {
    const newValue = event.target.value;
    setSearchFormInput(newValue);
  }

  async function formSubmit() {
    const postRequestParams = {
      url: "/SearchMovies",
      searchTitle: searchFormInput,
      searchRelatedMovies: props.showRelatedMovieSwitchChecked,
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
    <form className="searchForm" onSubmit={handleSubmit}>
      <Box
        className="mainFormBox"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        noValidate
      >
        <Box gridColumn="span 2">
          <SearchTextField
            name="searchFormInput"
            label="Title of the movie"
            value={searchFormInput}
            onChange={handleInputChange}
            autoComplete="off"
            fullWidth
          />
        </Box>
        <Box gridColumn="span 1">
          <Button
            variant="contained"
            type="submit"
            className="searchButton"
            disabled={props.loading}
          >
            Search
          </Button>
        </Box>
        <Box className="loadingBarFormBox" gridColumn="span 3">
          {props.loading && <LinearProgress color="inherit" />}
        </Box>
        <Box gridColumn="span 3">
          <FormControlLabel
            control={
              <Switch
                checked={props.showRelatedMovieSwitchChecked}
                onChange={handleRelatedSwitchChange}
              />
            }
            label="Show related movies"
          />
        </Box>
      </Box>
    </form>
  );
}
