import React from "react";
import {connect} from "react-redux";
import {getSongs} from "../redux/actions/songAction";

class SongList extends React.Component {
  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    const {songs} = this.props;
    return (
      <div>
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
    songs: state.songReducer.songs,
  };
};

const mapDispatchToProps = {
  getSongs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongList);
