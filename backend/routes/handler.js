import { Router } from "express";
import {
  processTMDBWResult,
  fetchFromAPI,
  createURLFromParams,
} from "../apiCommunication.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const router = Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get request from Client towards Server
router.get("/", function (req, res) {
  res.sendFile(join(__dirname, "../../frontend/build", "index.html"));
});

router.post("/SearchMovies", (req, res) => {
  const url = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
  const headers = { "Content-Type": "application/json" };
  const relatedMovieSearch = req.body.searchRelatedMovies;
  console.log(relatedMovieSearch);
  const query = `query{
    searchMovies(query: "${req.body.queryWord}") {
      id
      name
      similar{name}
      genres {
        name
      }
      score
    }
  }`;

  // GraphQL request towards TMDBW
  fetchFromAPI(url, "POST", headers, { query })
    .then((data) => {
      res.send(processTMDBWResult(data));
    })
    .catch((error) =>
      console.error(
        "Something went wrong while getting movies from TMDBW: " + error
      )
    );
});

router.post("/WikiSearch", (req, res) => {
  const params = {
    url: "https://en.wikipedia.org/w/api.php",
    action: "opensearch",
    search: req.body.queryWord,
    limit: "1", // return only the first result
    namespace: "0",
    format: "json",
  };

  const url = createURLFromParams(params);
  // Defined by Wiki API. See more:
  //  https://www.mediawiki.org/w/index.php?title=API:Opensearch&action=edit&section=4 at the "Details" section.
  const titleOfMovie = 3;

  fetchFromAPI(url, "GET")
    .then((data) => {
      res.send(data[titleOfMovie]);
    })
    .catch((error) =>
      console.error(
        "Something went wrong while get request towards Wikipedia: " + error
      )
    );
});

export default router;
