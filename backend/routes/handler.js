import { Router } from "express";
const router = Router();
import { graphQLReqest, processSearchResult } from "../graphQL.js";

router.post("/movies", (req, res) => {
  // separate into other function
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
      console.log("Something went wrong post request towards TMDBW: " + error)
    );
});

export default router;
