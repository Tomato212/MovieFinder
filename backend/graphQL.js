import fetch from "node-fetch";

// POST method implementation from Server towars TMDBW:
async function graphQLReqest(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getDetailsFromWikipedia(title) {
  const endpoint = "https://en.wikipedia.org/w/api.php";
  const action = "opensearch";
  const search = title; // search query
  const limit = 1; // return only the first result
  const namespace = 0; // search only articles, ignoring Talk, Mediawiki, etc.
  const format = "json"; // jsonfm prints the JSON in HTML for debugging.
  const URL = `${endpoint}?action=${action}&format=${format}&search=${search}&namespace=${namespace}&limit=${limit}`;
  const response = await fetch(URL, {
    method: "GET",
  }).catch((error) => {
    console.error("Error while getting search results from Wikipedia:", error);
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function processSearchResult(searchResult = {}) {
  let listOfMovies = {};
  if (searchResult.data !== null) {
    listOfMovies = searchResult.data.searchMovies;
    console.log("Search via TMDBW was successful!");
  } else {
    console.log("Empty search results!");
  }
  return listOfMovies;
}

function processWikiSearchResult(searchResult = {}) {
  let listOfMovies = searchResult[3];
  console.log(listOfMovies);

  // if (searchResult.data !== null) {
  //   listOfMovies = searchResult.data.searchMovies;
  //   console.log("Search via TMDBW was successful!");
  // } else {
  //   console.log("Empty search results!");
  // }
  return listOfMovies;
}
export {
  graphQLReqest,
  processSearchResult,
  getDetailsFromWikipedia,
  processWikiSearchResult,
};
