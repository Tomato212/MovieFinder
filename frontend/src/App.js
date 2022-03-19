import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Movie from "./components/Movie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import CustomizedTables from "./Table";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Movie Finder</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
        </Routes>
        {/* <form action="/" method="post">
          <input
            type="text"
            placeholder="Type the title of the movie."
            name="queryText"
          />
          <button type="submit">Search</button>
        </form> */}

        {/* <CustomizedTables /> */}
      </div>
    </Router>
  );
}

export default App;
