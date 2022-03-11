import React, { useState } from "react";
import CustomizedTables from "./Table";

function App() {
  // const [queryText, setQueryText] = useState("");

  // function saveName(event) {
  //   setName(event.target.value);
  // }

  // function searchButtonPressed(event) {
  //   saveInputText(name);
  //   event.preventDefault();
  // }



  return (
    <div className="container">
      <h1>Movie Finder</h1>
      <form action="/" method="post">
        <input
          type="text"
          placeholder="Type the title of the movie."
        />
        <button type="submit">Search</button>
      </form>

      <CustomizedTables />
    </div>
  );
}

export default App;
