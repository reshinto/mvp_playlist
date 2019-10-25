import React from "react";
import Button from "@material-ui/core/Button";
import {goTo} from "react-chrome-extension-router";
import LoginForm from "../components/forms/LoginForm";
import Login from "./Login";

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <LoginForm type="Register" />
      <Button
        fullWidth
        style={{backgroundColor: "white", marginTop: "50px"}}
        onClick={() => goTo(Login, {message: "From register page"})}
      >
        Login
      </Button>
    </div>
  );
}

export default Register;
