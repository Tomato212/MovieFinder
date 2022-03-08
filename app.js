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

let listOfMovies2;
  function processSearchResult(searchResult = {}) {
    if (searchResult.data != null) {
      let listOfMovies = searchResult.data.searchMovies;
      listOfMovies2 = listOfMovies;
      console.log("Seach");
      console.log(listOfMovies);
    } else {
      console.log("Empty search results!");
    }
    return;
  }


  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function demo() {
      for (let i = 0; i < 3; i++) {
          console.log(`Waiting ${i} seconds...`);
          await sleep(i * 1000);
      }
      console.log('Done');
      res.send(listOfMovies2);
  }

  demo();



  // res.write(x);
  // res.json(x); //http://expressjs.com/en/5x/api.html#res.send

})

// Get request from Server towars TMDB API
// https.get(url, function(response) {
//   console.log("TMDB Get Status Code: " + response.statusCode);
//
//   if (response.statusCode === 200) {
//     response.on("data", function(data) {
//       const hurra = JSON.parse(data);
//       console.log(hurra);
//
//       // const movieID = JSON.parse(data).results[0].id;
//       // const movieTitle = rawMovieData.results[0].title;
//       // //const movieGenres = rawMovieData.genres[0].name;
//       // const movieVote = rawMovieData.results[0].vote_average;
//       // res.write("<p> ID: " + movieID + "</p>");
//       // res.write("<p> Title: " + movieTitle + "</p>");
//       // //res.write("<p> Genres: " + movieGenres + "</p>");
//       //  res.write(hurra);
//       res.send();
//     })
//   } else {
//     res.write("Not found!");
//     res.send();
//   }





app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
