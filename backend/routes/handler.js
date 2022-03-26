import { Router } from "express";
const router = Router();
import {
  graphQLReqest,
  processSearchResult,
  getDetailsFromWikipedia,
  processWikiSearchResult,
} from "../graphQL.js";
import fetch from "node-fetch";

router.post("/SearchMovies", (req, res) => {
  // separate into other function
  // Search for similar movies: similar{name}

  const titleQuery = req.body.formData;
  const endpoint = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
  const query = `query{
    searchMovies(query: "${titleQuery}") {
      id
      name
      genres {
        name
      }
      score
    }
  }`;

  // GraphQL request towards TMDBW
  graphQLReqest(endpoint, {
    query,
  })
    .then((data) => {
      res.send(processSearchResult(data));
    })
    .catch((error) =>
      console.log(
        "Something went wrong while post request towards TMDBW: " + error
      )
    );
});

router.post("/WikiSearch", (req, res) => {
  const titleQuery = req.body.formData;
  getDetailsFromWikipedia(titleQuery)
    .then((data) => {
      res.send(processWikiSearchResult(data));
    })
    .catch((error) =>
      console.log(
        "Something went wrong while get request towards Wikipedia: " + error
      )
    );
});

export default router;
