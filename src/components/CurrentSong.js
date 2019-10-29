import React from "react";
import {connect} from "react-redux";
import YouTube from "react-youtube";
import {getSongs, deleteSong} from "../redux/actions/songAction";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import Dialog from "@material-ui/core/Dialog";
// import EditIcon from "@material-ui/icons/Edit";
// import StarIcon from "@material-ui/icons/Star";
// import AddVideoForm from "./forms/AddVideoForm";
import Play from "./controls/Play";
import Pause from "./controls/Pause";
import Next from "./controls/Next";
import Previous from "./controls/Previous";
// import Shuffle from "./controls/Shuffle";
// import Loop from "./controls/Loop";

class CurrentSong extends React.Component {
  state = {
    open: false,
    opts: {
      height: `${Math.floor(window.innerWidth / 10 * 6)}`,
      width: `${Math.floor(window.innerWidth / 10 * 9)}`,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        disablekb: 1,
        cc_load_policy: 0,
      },
    },
    videoId: "",
    playingStatus: false,
    player: null,
  };

  componentDidMount() {
    this.props.getSongs();
    this.interval = setInterval(() => {
      if (this.state.videoId !== localStorage.getItem("videoId")) {
        this.onPauseVideo();
        setTimeout(() => {
          this.setState({
            videoId: localStorage.getItem("videoId"),
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
    const {songs} = this.props;
    const currentIndex = parseInt(localStorage.getItem("currentIndex"));
    if (songs.length > 0) {
      if (currentIndex < songs.length) {
        let newIndex = currentIndex + num;
        if (newIndex < 0) newIndex = 0;
        else if (newIndex >= songs.length) newIndex = songs.length - 1;
        localStorage.setItem("currentIndex", newIndex);
        localStorage.setItem("songId", songs[newIndex].song_id);
        localStorage.setItem("songTitle", songs[newIndex].title);
        localStorage.setItem("videoId", songs[newIndex].video_link);
        await this.setState({
          videoId: songs[newIndex].video_link,
        });
      }
    }
  };

  initializeFirstVideo = async () => {
    const {songs} = this.props;
    const currentIndex = 0;
    if (songs.length > 0) {
      localStorage.setItem("currentIndex", currentIndex);
      localStorage.setItem("songId", songs[currentIndex].song_id);
      localStorage.setItem("songTitle", songs[currentIndex].title);
      localStorage.setItem("videoId", songs[currentIndex].video_link);
      await this.setState({
        videoId: songs[currentIndex].video_link,
      });
    }
  };

  render() {
    const {songs} = this.props;
    const {opts, videoId, playingStatus} = this.state;
    if (videoId === "") this.initializeFirstVideo();
    return (
      <div>
        {songs.length > 0 ? (
          <div>
            <div style={{margin: "10px auto"}}>
              <YouTube
                videoId={videoId}
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
              <h3>{localStorage.getItem("songTitle")}</h3>
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
    songs: state.songReducer.songs,
  };
};

const mapDispatchToProps = {
  getSongs,
  deleteSong,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentSong);
