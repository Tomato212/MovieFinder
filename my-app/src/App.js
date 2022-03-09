// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;


import React, { useState } from "react";
import CustomizedTables from "./Row";

function App() {
  const [name, setName] = useState("");
  const [inputText, saveInputText] = useState("");

  function saveName(event) {
    setName(event.target.value);
    console.log(event.target.value);
  }

  function buttonPressed(event) {
    saveInputText(name);
    event.preventDefault();
  }

  return (
    <div className="container">
      {/* <img
        src="https://picsum.photos/200/300?grayscale"
        alt="Random greyscale."
        width="1000"
        height="135"
      /> */}

      <h1>Movie Finder {inputText}</h1>
      <form onSubmit={buttonPressed}>
        <input
          onChange={saveName}
          type="text"
          placeholder="Type the title of the movie."
          value={name}
        />
        <button type="submit">Search</button>
      </form>

      <CustomizedTables />
    </div>
  );
}

export default App;
