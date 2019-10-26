import React from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {login, signup} from "../../redux/actions/authAction";
import {goTo} from "react-chrome-extension-router";
import Home from "../../pages/Home";

class LoginForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    const {type} = this.props;
    const {username, email, password} = this.state;
    if (type.toLowerCase() === "login") {
      this.props.login(username, password);
    } else {
      this.props.signup(username, email, password);
    }
  };

  onChange = prop => e => this.setState({[prop]: e.target.value});

  render() {
    const {username, email, password} = this.state;
    const {type} = this.props;
    const {isAuthenticated} = this.props.auth;
    if (isAuthenticated) goTo(Home, {message: "From login page"});
    return (
      <form style={{backgroundColor: "white"}} onSubmit={this.handleSubmit}>
        <TextField
          type="text"
          name="username"
          value={username}
          onChange={this.onChange("username")}
          autoFocus
          margin="dense"
          label="Username"
          autoComplete="username"
          fullWidth
        />
        {type.toLowerCase() === "register" ? (
          <TextField
            type="email"
            name="email"
            value={email}
            onChange={this.onChange("email")}
            margin="dense"
            label="Email"
            autoComplete="email"
            fullWidth
          />
        ) : (
          ""
        )}
        <TextField
          type="password"
          name="password"
          onChange={this.onChange("password")}
          margin="dense"
          label="Password"
          autoComplete="current-password"
          fullWidth
        />
        <Button fullWidth color="primary" type="submit">{type}</Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = {
  login: (username, password) => login(username, password),
  signup: (username, email, password) => signup(username, email, password),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
