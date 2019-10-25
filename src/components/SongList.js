import React from "react";
import {connect} from "react-redux";
import {getSongs, deleteSong} from "../redux/actions/songAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Dialog from "@material-ui/core/Dialog";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AddVideoForm from "./forms/AddVideoForm";
// import YouTubeVideo from "./YouTubeVideo";

class SongList extends React.Component {
  state = {
    open: false,
    currentId: 0,
  };

  componentDidMount() {
    this.props.getSongs();
  }

  handleClickOpen = async id => {
    await this.setState({open: true, currentId: id});
  };

  handleClose = async () => {
    await this.setState({open: false});
    window.location.reload(false);
  };

  handleTitleClick = id => {
    const iframe = document.getElementById(`video${id}`);
    const text = document.getElementById(`text${id}`);
    if (iframe.style.display === "none") {
      iframe.style.display = "inline-block";
      text.style.color = "#f50057";
    } else {
      iframe.style.display = "none";
      text.style.color = "white";
    }
  };

  render() {
    const {songs} = this.props;
    return (
      <div>
        {songs.length > 0
          ? songs.map((song, i) => (
              <div key={song.id}>
                <h3>
                  <Button
                    id={`text${song.id}`}
                    style={{color: "white"}}
                    onClick={() => this.handleTitleClick(song.id)}
                  >
                    {song.title} - {song.artist}
                  </Button>
                  <Tooltip title="Edit">
                    <Button
                      onClick={() => this.handleClickOpen(song.id)}
                    >
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
                <iframe
                  style={{display: "none"}}
                  id={`video${song.id}`}
                  title={`${song.title}|${song.artist}|${song.id}`}
                  className="songs"
                  width="300"
                  height="200"
                  src={`${song.video_link}?fs=1
                  &rel=0
                  &modestbranding=1
                  &enablejsapi=1
                  &autoplay=1`}
                  frameborder="0"
                  allow="encrypted-media"
                  allowfullscreen="true"
                ></iframe>
                <hr />
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
  deleteSong,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongList);
