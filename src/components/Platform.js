import React from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { connect } from "react-redux";
import {Router} from "react-chrome-extension-router";

function Platform(props) {
  // const {isAuthenticated} = props.auth;
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  return (
    <Router>
      {isAuthenticated === "true" ? <Home /> : <Login />}
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

// export default Platform;
export default connect(
  mapStateToProps,
)(Platform);

// <Navbar />
