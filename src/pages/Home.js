import React from "react";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/userAction";
import {getSongs} from "../redux/actions/songAction";
import {goTo} from "react-chrome-extension-router";
import AddVideoForm from "../components/forms/addVideoForm";

class Home extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getSongs();
  }

  render() {
    const {user, songs} = this.props;
    return (
      <div>
        <h1>{user.length > 0 ? user[0].username : ""} Songs List</h1>
        <AddVideoForm />
        {songs.length > 0
          ? songs.map((song, i) => (
              <div key={i}>
                <h4>
                  {song.title} - {song.artist}
                </h4>
                <iframe
                  className="songs"
                  width="300"
                  height="200"
                  src={`${song.video_link}?fs=1
                  &rel=0
                  &modestbranding=1
                  &enablejsapi=1`}
                  frameborder="0"
                  allow="encrypted-media"
                  allowfullscreen="true"
                ></iframe>
              </div>
            ))
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    songs: state.songReducer.songs,
  };
};

const mapDispatchToProps = {
  getUser,
  getSongs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
