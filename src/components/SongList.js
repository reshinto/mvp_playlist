import React from "react";
import {connect} from "react-redux";
import {getSongs, getSong, deleteSong} from "../redux/actions/songAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import EditVideoForm from "./forms/EditVideoForm";

class SongList extends React.Component {
  state = {
    open: false,
    currentId: 0,
    videoId: "",
    currentIndex: 0,
    player: null,
  };

  componentDidMount() {
    this.props.getSongs();
  }

  handleClickOpen = id => {
    this.props.getSong(id);
    setTimeout(() => {
      this.setState({open: true, currentId: id});
    }, 150)
  };

  handleClose = async () => {
    await this.setState({open: false});
    this.props.getSongs();
  };

  handleTitleClick = async (id, videoIndex) => {
    const {songs} = this.props;
    const text = document.getElementById(`text${id}`);
    if (songs.length > 0) {
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
    if (songs !== null && songs !== undefined) {
      if (songs.length > 0) {
        for (let i = 0; i < songs.length; i++) {
          const _text = document.getElementById(`text${songs[i].id}`);
          if (_text.style.color === "rgb(245, 0, 87)") {
            _text.style.color = "black";
          }
        }
        if (currentIndex < songs.length) {
          if (currentIndex === songs.length - 1) last = 1;
          const text = document.getElementById(
            `text${songs[currentIndex + 1 - last].id}`,
          );
          if (text.style.color === "black") {
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

  render() {
    const {songs} = this.props;
    return (
      <div style={{overflowY: "scroll"}}>
        {songs.length > 0
          ? songs.map((song, i) => (
              <DialogContent key={song.id}>
                <h3>
                  <Button
                    id={`text${song.id}`}
                    style={{color: "black"}}
                    onClick={() => this.handleTitleClick(song.id, i)}
                  >
                    {song.title} - {song.artist}
                  </Button>
                </h3>
                <Tooltip title="Like">
                  <Button>
                    <StarIcon fontSize="small" color="secondary" />
                  </Button>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button
                    onClick={() => {
                      this.handleClickOpen(song.id);
                    }}
                  >
                    <EditIcon fontSize="small" color="secondary" />
                  </Button>
                </Tooltip>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <EditVideoForm
                    songId={this.state.currentId}
                    clickSubmit={this.handleClose}
                  />
                </Dialog>
                <Tooltip title="Delete">
                  <Button
                    onClick={async () => {
                      await this.props.deleteSong(song.id);
                      this.props.getSongs();
                    }}
                  >
                    <DeleteForeverIcon fontSize="small" color="secondary" />
                  </Button>
                </Tooltip>
                <hr />
              </DialogContent>
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
  getSong: songId => getSong(songId),
  getSongs,
  deleteSong,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongList);
