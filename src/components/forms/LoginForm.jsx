import React from "react";
import {goTo} from "react-chrome-extension-router";
import Home from "../../pages/Home";

function LoginForm(props) {
  const {type} = props;
  return (
    <form action={`/${type.toLowerCase()}`} method="post">
      <div>
        <input type="text" name="username" placeholder="Username" />
      </div>
      {type.toLowerCase() === "register" ? (
        <div>
          <input type="email" name="email" placeholder="Email" />
        </div>
      ) : (
        ""
      )}
      <div>
        <input type="password" name="password" placeholder="password" />
      </div>
      <input
        onClick={() => goTo(Home, {message: "From login page"})}
        type="submit"
        value={type}
      />
    </form>
  );
}

export default LoginForm;
