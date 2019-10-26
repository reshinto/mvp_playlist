import React from "react";
import {goTo} from "react-chrome-extension-router";
import Button from "@material-ui/core/Button";
import Register from "./Register";
import LoginForm from "../components/forms/LoginForm";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm type="Login" />
      <Button
        style={{backgroundColor: "white", marginTop: "50px"}}
        fullWidth
        onClick={() => goTo(Register, {message: "From login page"})}
      >
        Register
      </Button>
    </div>
  );
}

export default Login;
