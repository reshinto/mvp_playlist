import React from "react";
import Login from "../pages/Login";
import {Router} from "react-chrome-extension-router";

function Platform() {
  return (
    <Router>
      <Login />
    </Router>
  );
}

export default Platform;

// <Navbar />
