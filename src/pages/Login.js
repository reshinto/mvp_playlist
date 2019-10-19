import React from "react";
import { connect } from "react-redux";
import { getInfo } from "../redux/actions/authAction";
import { goTo } from 'react-chrome-extension-router';
import Test from "./Test";
// import Button from "@material-ui/core/Button";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import TextField from "@material-ui/core/TextField";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import IconButton from "@material-ui/core/IconButton";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { db } from "../redux/utility";

class LoginForm extends React.Component {
  // state = {
  //   username: "",
  //   password: "",
  //   showPassword: false
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.login(this.state.username, this.state.password);
  //   // this.props.history.push("/");
  // };

  // onChange = prop => e => this.setState({ [prop]: e.target.value });

  // handleClickShowPassword = () => {
  //   this.setState(state => ({ showPassword: !state.showPassword }));
  // };
  componentDidMount() {
    this.props.getInfo();
  }

  render() {

    return (
      <div>
        <h1>Login Page</h1>
        <p>{this.props.user.userData}</p>
        <button onClick={() => goTo(Test, { message: "From login page" })}>
          go to test page
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = {
  getInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
