import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <React.Fragment>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
    </React.Fragment>
  );
}

export default Nav;
