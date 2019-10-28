import React from "react";
import {connect} from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
// import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import ToggleButton from '@material-ui/lab/ToggleButton';
import {getSongs, getSong, deleteSong} from "../../redux/actions/songAction";
import Delete from "../controls/Delete";
import Edit from "../controls/Edit";

class SongList extends React.Component {
  state = {
    open: false,
    currentId: 0,
    videoId: "",
    currentIndex: 0,
    // selected: false,
  };

  componentDidMount() {
    this.props.getSongs();
  }

  handleClickOpen = id => {
    this.props.getSong(id);
    setTimeout(() => {
      this.setState({open: true, currentId: id});
    }, 500);
  };

  handleClose = async () => {
    await this.setState({open: false});
    this.props.getSongs();
  };

  handleTitleClick = async (id, videoIndex) => {
    const {songs} = this.props;
    document.getElementById(
      `text${localStorage.getItem("songId")}`,
    ).style.color = "black";
    document.getElementById(`text${id}`).style.color = "#f50057";
    localStorage.setItem("currentIndex", videoIndex);
    localStorage.setItem("songId", songs[videoIndex].id);
    localStorage.setItem("songTitle", songs[videoIndex].title);
    localStorage.setItem("videoId", songs[videoIndex].video_link);
  };

  render() {
    const {songs} = this.props;
    const currentSongId = localStorage.getItem("songId");
    const currentElement = document.getElementById(`text${currentSongId}`);
    if (currentElement !== null) currentElement.style.color = "#f50057";
    return (
      <div style={{overflowY: "scroll"}}>
        {songs.length > 0
          ? songs.map((song, i) => (
              <DialogContent key={song.id}>
                <h3>
                  <Button
                    id={`text${song.id}`}
                    style={{color: "black"}}
                    onClick={() => {
                      this.handleTitleClick(song.id, i);
                    }}
                  >
                    {song.title} - {song.artist}
                  </Button>
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {/*
                  <Tooltip title="Like">
                    <Button>
                      <StarIcon fontSize="small" color="secondary" />
                    </Button>
                  </Tooltip>
                  */}
                  <Edit
                    currentId={this.state.currentId}
                    handleClose={this.handleClose}
                    handleClickOpen={this.handleClickOpen}
                    id={song.id}
                    open={this.state.open}
                    type="video"
                  />
                  <Delete
                    delete={this.props.deleteSong}
                    getData={this.props.getSongs}
                    id={song.id}
                  />
                </div>
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
