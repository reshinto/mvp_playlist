import React from "react";
import {connect} from "react-redux";
import {getSongs, deleteSong} from "../redux/actions/songAction";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import Dialog from "@material-ui/core/Dialog";
// import EditIcon from "@material-ui/icons/Edit";
// import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
// import AddVideoForm from "./forms/AddVideoForm";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import YouTube from "react-youtube";

class CurrentSong extends React.Component {
  state = {
    open: false,
    opts: {
      height: "200",
      width: "300",
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
      if (this.state.videoId !== localStorage.getItem("videoId"))
        this.onPauseVideo();
        this.setState({
          videoId: localStorage.getItem("videoId"),
        });
        setTimeout(() => this.onPlayVideo(), 200);
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
        localStorage.setItem("songId", songs[newIndex].id);
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
      localStorage.setItem("songId", songs[currentIndex].id);
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
              <Tooltip title="Previous Song">
                <Button onClick={this.onPreviousVideo}>
                  <SkipPreviousIcon fontSize="small" color="secondary" />
                </Button>
              </Tooltip>
              {playingStatus ? (
                <Tooltip title="Pause Song">
                  <Button onClick={this.onPauseVideo}>
                    <PauseCircleOutlineIcon
                      fontSize="small"
                      color="secondary"
                    />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Play Song">
                  <Button onClick={this.onPlayVideo}>
                    <PlayCircleOutlineIcon fontSize="small" color="secondary" />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="Next Song">
                <Button onClick={this.onNextVideo}>
                  <SkipNextIcon fontSize="small" color="secondary" />
                </Button>
              </Tooltip>
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
