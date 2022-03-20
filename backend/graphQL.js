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

export { graphQLReqest, processSearchResult };
