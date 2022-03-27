import React, { useState } from "react";

function WikiSearch(queryTitle) {
  const [searchResult, setSearchResult] = useState("");

  // respond with "hello world" when a GET request is made to the homepage
  fetch(
    "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Hampi&namespace=0&limit=10"
  )
    .then((response) => response.json())
    .then((data) => setSearchResult(data))
    .catch((error) => {
      console.error(
        "Error while getting search results from Wikipedia:",
        error
      );
    });

  //   fetch(
  //     "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Hampi&namespace=0&limit=10"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));

  console.log(searchResult);

  //   console.log(data);
  // .get("/", (req, res) => {
  //   res.send("hello world");
  // })
  //   const data2 = await get("/movies", {
  //     //extract url
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: `{
  //         "formData": "${formData}"
  // //       }`,
  // //   })
  // .then((response) => response.json())
  // .then((response) => setSearchResult(response));

  //   formSubmit(queryTitle);

  //   console.log(queryTitle);

  return <div></div>;
}

// async function formSubmit(formData) {
//   // https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Hampi&namespace=0&limit=10
//   //   setLoading(false);
// }

export default WikiSearch;
