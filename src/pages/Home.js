import React from "react";
import {connect} from "react-redux";
import {getUsers} from "../redux/actions/authAction";
import {goTo} from "react-chrome-extension-router";

function Home(props) {
  const {isAuthenticated} = props.auth;
  return (
    <div>
      <h1>Home Page</h1>
      <iframe
        width="300"
        height="200"
        src="https://www.youtube.com/embed/ZcOBKyu460g?fs=1
        &rel=0
        &modestbranding=1
        &enablejsapi=1"
        frameborder="0"
        allow="encrypted-media"
        allowfullscreen="true"
      ></iframe>
    </div>
  );
}

// <iframe width="100" height="50" src="https://www.youtube.com/embed/zgpamzEfjwE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="false"></iframe>

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

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
  };
};

// const mapDispatchToProps = {
//   getUsers,
// };

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Home);
