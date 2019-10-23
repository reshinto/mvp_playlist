import React from "react";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/userAction";
import {getSongs} from "../redux/actions/songAction";
import {goTo} from "react-chrome-extension-router";
import AddVideoForm from "../components/forms/AddVideoForm";
import SongList from "../components/SongList";

class Home extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        <h1>{user.length > 0 ? user[0].username : ""} Songs List</h1>
        <AddVideoForm />
        <SongList />
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
