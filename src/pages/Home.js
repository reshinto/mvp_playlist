import React from "react";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/userAction";
import Navbar from "../components/Navbar";
import AddVideoForm from "../components/forms/AddVideoForm";

class Home extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        <h1>{user.length > 0 ? user[0].username : ""} Songs List</h1>
        <Navbar />
        <div
          style={{visibility: "hidden"}}
        >
          <AddVideoForm type="Add" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  getUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
