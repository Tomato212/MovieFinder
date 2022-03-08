import https from "https";
import fetch from "node-fetch";
import bodyParser from "body-parser";
// const searchMovie = require(  "./request.js");
import express from "express";
import {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const __dirname = dirname(fileURLToPath(
  import.meta.url));

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))

// Get request from Client towards Server
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

// Post request from Client towards Server
app.post("/", function(req, res) {
  // separate into other function
  const titleQuery = req.body.movieTitle;
  const endpoint = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
  let query = `query{
  searchMovies(query: "` + titleQuery + `") {
    id
    name
    genres {
      name
    }
    score
  }
}`;

  // POST method implementation from Server towars TMDBW:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(endpoint, {query})
    .then(data => {
      processSearchResult(data)
      //  .catch(error => console.log("Something went wrong post request towards TMDBW: " + error)); // JSON data parsed by `data.json()` call
    });


  function processSearchResult(searchResult = {}) {
    let listOfMovies = {};
    if (searchResult.data != null) {
      listOfMovies = searchResult.data.searchMovies;
      console.log("Search via TMDBW was successful!");
      //console.log(listOfMovies);
    } else {
      console.log("Empty search results!");
    }
    res.send(listOfMovies);
  }
})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
