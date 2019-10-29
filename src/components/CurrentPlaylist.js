import React from "react";
import {connect} from "react-redux";
import YouTube from "react-youtube";
import {
  getPlaylistSongs,
  deletePlaylistSong,
} from "../redux/actions/playlistSongAction";
import Play from "./controls/Play";
import Pause from "./controls/Pause";
import Next from "./controls/Next";
import Previous from "./controls/Previous";
// import Shuffle from "./controls/Shuffle";
// import Loop from "./controls/Loop";
import SelectPlaylist from "./controls/SelectPlaylist";

class CurrentPlaylist extends React.Component {
  state = {
    open: false,
    opts: {
      height: `${Math.floor((window.innerWidth / 10) * 6)}`,
      width: `${Math.floor((window.innerWidth / 10) * 9)}`,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        disablekb: 1,
        cc_load_policy: 0,
      },
    },
    playlistVideoId: "",
    playingStatus: false,
    player: null,
  };

  componentDidMount() {
    this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
    this.interval = setInterval(() => {
      if (this.state.playlistVideoId !== localStorage.getItem("playlistVideoId")) {
        this.onPauseVideo();
        setTimeout(() => {
          this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
          this.setState({
            playlistVideoId: localStorage.getItem("playlistVideoId"),
          });
        }, 100);
        setTimeout(() => this.onPlayVideo(), 250);
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onReady = async event => {
    // access to player in all event handlers via event.target
    await this.setState({player: event.target});
  };

  onPlayVideo = async () => {
    this.state.player.playVideo();
    await this.setState({
      playingStatus: true,
    });
  };

  onPauseVideo = async () => {
    this.state.player.pauseVideo();
    await this.setState({
      playingStatus: false,
    });
  };

  onNextVideo = () => {
    this.onPauseVideo();
    setTimeout(() => this.onChangeVideo(1), 100);
    setTimeout(() => this.onPlayVideo(), 200);
  };

  onPreviousVideo = async () => {
    this.onPauseVideo();
    setTimeout(() => this.onChangeVideo(-1), 100);
    setTimeout(() => this.onPlayVideo(), 200);
  };

  onChangeVideo = async num => {
    const {playlistSongs} = this.props;
    const currentIndex = parseInt(
      localStorage.getItem("currentPlaylistSongIndex"),
    );
    if (playlistSongs.length > 0) {
      if (currentIndex < playlistSongs.length) {
        let newIndex = currentIndex + num;
        if (newIndex < 0) newIndex = 0;
        else if (newIndex >= playlistSongs.length)
          newIndex = playlistSongs.length - 1;
        localStorage.setItem("currentPlaylistSongIndex", newIndex);
        localStorage.setItem(
          "playlistSongId",
          playlistSongs[newIndex].playlist_songs_id,
        );
        localStorage.setItem(
          "playlistSongTitle",
          playlistSongs[newIndex].title,
        );
        localStorage.setItem(
          "playlistVideoId",
          playlistSongs[newIndex].video_link,
        );
        await this.setState({
          playlistVideoId: playlistSongs[newIndex].video_link,
        });
      }
    }
  };

  initializeFirstVideo = async () => {
    const {playlistSongs} = this.props;
    const currentIndex = 0;
    if (playlistSongs.length > 0) {
      localStorage.setItem("currentPlaylistSongsIndex", currentIndex);
      localStorage.setItem(
        "playlistSongsId",
        playlistSongs[currentIndex].playlist_songs_id,
      );
      localStorage.setItem(
        "playlistSongId",
        playlistSongs[currentIndex].song_id,
      );
      localStorage.setItem("playlistSongTitle", playlistSongs[currentIndex].title);
      localStorage.setItem(
        "playlistVideoId",
        playlistSongs[currentIndex].video_link,
      );
      await this.setState({
        playlistVideoId: playlistSongs[currentIndex].video_link,
      });
    }
  };

  render() {
    const {playlistSongs} = this.props;
    const {opts, playlistVideoId, playingStatus} = this.state;
    if (playlistVideoId === "") this.initializeFirstVideo();
    return (
      <div>
        <SelectPlaylist />
        {playlistSongs.length > 0 ? (
          <div>
            <div style={{margin: "10px auto"}}>
              <YouTube
                videoId={playlistVideoId}
                opts={opts}
                onReady={this.onReady}
                onPlay={this.onPlayVideo}
                onPause={this.onPauseVideo}
                onEnd={this.onNextVideo}
              />
            </div>
            <div>
              <Previous onPreviousVideo={this.onPreviousVideo} />
              {/*
              <Loop onLoopVideo={this.onLoopVideo} />
              */}
              {playingStatus ? (
                <Pause onPauseVideo={this.onPauseVideo} />
              ) : (
                <Play onPlayVideo={this.onPlayVideo} />
              )}
              {/*
              <Shuffle onShuffleVideo={this.onShuffleVideo} />
              */}
              <Next onNextVideo={this.onNextVideo} />
              <h3>{localStorage.getItem("playlistSongTitle")}</h3>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlistSongs: state.playlistSongReducer.playlistSongs,
  };
};

const mapDispatchToProps = {
  getPlaylistSongs: playlist_id => getPlaylistSongs(playlist_id),
  deletePlaylistSong,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentPlaylist);
