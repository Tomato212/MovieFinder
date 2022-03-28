import fetch from "node-fetch";

async function fetchFromAPI(url = "", method = "GET", headers, body) {
  // Request towards API
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  }).catch((error) => {
    console.error(`Error while getting search results from API ${url}:`, error);
  });
  return response.json();
}

function createURLFromParams(params) {
  // Assembling URL from parameters
  let url = params.url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });
  return url;
}

function processTMDBWResult(searchResult = {}) {
  let listOfMovies = {};
  if (searchResult.data !== null) {
    listOfMovies = searchResult.data.searchMovies;
    console.log("Search via TMDBW was successful!");
  } else {
    console.error("Empty TMDBW search results!");
  }
  return listOfMovies;
}

export { processTMDBWResult, fetchFromAPI, createURLFromParams };
