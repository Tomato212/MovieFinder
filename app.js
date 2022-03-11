import bodyParser from "body-parser";
import express from "express";
import {
  graphQLReqest,
  processSearchResult
} from "./graphQL.js";
import {
  dirname, join
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
app.use(express.static(join(__dirname, 'my-app/build')));

// Get request from Client towards Server
app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'my-app/build', 'index.html'));
});

// Post request from Client towards Server
app.post("/", function(req, res) {
  // separate into other function
  const titleQuery = req.body.queryText;
  const endpoint = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
  const query = `query{
  searchMovies(query: "` + titleQuery + `") {
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
      query
    })
    .then(data => {
      res.send(processSearchResult(data))
    }).catch(error => console.log("Something went wrong post request towards TMDBW: " + error));
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
