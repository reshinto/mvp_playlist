import React from "react";
import {connect} from "react-redux";
import {getSongs, deleteSong} from "../redux/actions/songAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Dialog from "@material-ui/core/Dialog";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AddVideoForm from "./forms/AddVideoForm";
import YouTube from "react-youtube";

class SongList extends React.Component {
  state = {
    open: false,
    currentId: 0,
    opts: {
      height: "200",
      width: "300",
      playerVars: {
        autoplay: 1,
      },
    },
    videoId: "",
    currentIndex: 0,
    player: null,
  };

  componentDidMount() {
    this.props.getSongs();
  }

  handleClickOpen = async id => {
    await this.setState({open: true, currentId: id});
  };

  handleClose = async () => {
    await this.setState({open: false});
  };

  handleTitleClick = async (id, videoIndex) => {
    const {songs} = this.props;
    const text = document.getElementById(`text${id}`);
    for (let i = 0; i < songs.length; i++) {
      const _text = document.getElementById(`text${songs[i].id}`);
      if (_text.style.color === "rgb(245, 0, 87)") {
        _text.style.color = "white";
      }
    }
    if (text.style.color === "white") {
      text.style.color = "#f50057";
      await this.setState({
        videoId: this.props.songs[videoIndex].video_link,
        currentIndex: videoIndex,
      });
    }
  };

  onReady = async event => {
    // access to player in all event handlers via event.target
    await this.setState({player: event.target});
  };

  onPlayVideo = () => {
    this.state.player.playVideo();
  };

  onPauseVideo = () => {
    this.state.play.pauseVideo();
  };

  onChangeVideo = async () => {
    const {songs} = this.props;
    const {currentIndex} = this.state;
    let last = 0;
    for (let i = 0; i < songs.length; i++) {
      const _text = document.getElementById(`text${songs[i].id}`);
      if (_text.style.color === "rgb(245, 0, 87)") {
        _text.style.color = "white";
      }
    }
    if (songs !== null && songs !== undefined) {
      if (songs.length > 0) {
        if (currentIndex < songs.length) {
          if (currentIndex === songs.length - 1) last = 1;
          const text = document.getElementById(
            `text${songs[currentIndex + 1 - last].id}`,
          );
          if (text.style.color === "white") {
            text.style.color = "#f50057";
          }
          await this.setState({
            videoId: songs[currentIndex + 1 - last].video_link,
            currentIndex: currentIndex + 1 - last,
          });
        }
      }
    }
  };

  initializeFirstVideo = async () => {
    const {currentIndex} = this.state;
    const {songs} = this.props;
    const text = document.getElementById(`text${songs[currentIndex].id}`);
    if (songs.length > 0) {
      text.style.color = "#f50057";
      await this.setState({
        videoId: songs[currentIndex].video_link,
      });
    }
  };

  render() {
    const {songs} = this.props;
    const {opts, currentIndex, videoId} = this.state;
    if (videoId === "") this.initializeFirstVideo();
    return (
      <div>
        {songs.length > 0 ? (
          <>
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={this.onReady}
              onPlay={this.onPlayVideo}
              onPause={this.onPauseVideo}
              onEnd={this.onChangeVideo}
            />
            <div style={{height: "200px", overflowY: "scroll"}}>
              {songs.map((song, i) => (
                <div key={song.id}>
                  <h3>
                    <Button
                      id={`text${song.id}`}
                      style={{color: "white"}}
                      onClick={() => this.handleTitleClick(song.id, i)}
                    >
                      {song.title} - {song.artist}
                    </Button>
                    <Tooltip title="Like">
                      <Button>
                        <StarIcon fontSize="small" color="secondary" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <Button onClick={() => this.handleClickOpen(song.id)}>
                        <EditIcon fontSize="small" color="secondary" />
                      </Button>
                    </Tooltip>
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <AddVideoForm type="Edit" songId={this.state.currentId} />
                    </Dialog>
                    <Tooltip title="Delete">
                      <Button
                        onClick={async () => {
                          await this.props.deleteSong(song.id);
                          window.location.reload(false);
                        }}
                      >
                        <DeleteForeverIcon fontSize="small" color="secondary" />
                      </Button>
                    </Tooltip>
                  </h3>
                  <hr />
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
// <YouTubeVideo width="300" height="200" id="pDEe-eJ4MAg" />

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
)(SongList);
