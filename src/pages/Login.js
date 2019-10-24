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
      <Button fullWidth onClick={() => goTo(Register, {message: "From login page"})}>
        Register
      </Button>
    </div>
  );
}

export default Login;

// import React from "react";
// import { connect } from "react-redux";
// import { getUsers } from "../redux/actions/authAction";
// import { goTo } from 'react-chrome-extension-router';
// import Register from "./Register";
// import LoginForm from "../components/forms/LoginForm";

// class Login extends React.Component {
//   componentDidMount() {
//     this.props.getUsers();
//   }

//   render() {
//     const {users} = this.props.users;

//     return (
//       <div>
//         <h1>Login Page</h1>
//           {users !== undefined ? (users.map((user, i) => (
//             <div key={i}>
//               <p>{user.username}</p>
//               <p>{user.email}</p>
//             </div>
//           ))) : ""}
//         <LoginForm type="Login" />
//         <button onClick={() => goTo(Register, { message: "From login page" })}>
//           Register
//         </button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     users: state.authReducer.users,
//   };
// };

// const mapDispatchToProps = {
//   getUsers,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);
