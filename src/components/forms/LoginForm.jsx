import React from "react";
import {connect} from "react-redux";
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
    console.log(username, password);
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
    if (isAuthenticated)
      goTo(Home, {message: "From login page"})
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.onChange("username")}
          />
        </div>
        {type.toLowerCase() === "register" ? (
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.onChange("email")}
            />
          </div>
        ) : (
          ""
        )}
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.onChange("password")}
          />
        </div>
        <button
          type="submit"
        >
          {type}
        </button>
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
