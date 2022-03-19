import { Router } from "express";
const router = Router();
import { graphQLReqest, processSearchResult } from "../graphQL.js";

router.get("/movies", (req, res) => {
  // separate into other function
  //   const titleQuery = req.body.queryText;
  const endpoint = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
  const query = `query{
    searchMovies(query: "best") {
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
      console.log("Something went wrong post request towards TMDBW: " + error)
    );
});

export default router;
