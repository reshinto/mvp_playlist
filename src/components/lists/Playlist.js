import React from "react";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {
  getPlaylists,
  getPlaylist,
  deletePlaylist,
} from "../../redux/actions/playlistAction";
import Edit from "../controls/Edit";
import Delete from "../controls/Delete";

class Playlist extends React.Component {
  state = {
    open: false,
    currentPlaylistId: 0,
    playlistId: "",
    // currentIndex: 0,
  };

  componentDidMount() {
    this.props.getPlaylists();
  }

  handleClickOpen = id => {
    this.props.getPlaylist(id);
    setTimeout(() => {
      this.setState({open: true, currentPlaylistId: id});
    }, 500);
  };

  handleClose = () => {
    this.props.getPlaylists();
    this.setState({open: false});
  };

  handleTitleClick = async (playlistId, playlistIndex) => {
    // const {songs} = this.props;
    // document.getElementById(
    //   `text${localStorage.getItem("songId")}`,
    // ).style.color = "black";
    // document.getElementById(`text${id}`).style.color = "#f50057";
    // localStorage.setItem("currentIndex", videoIndex);
    // localStorage.setItem("songId", songs[videoIndex].id);
    // localStorage.setItem("songTitle", songs[videoIndex].title);
    // localStorage.setItem("videoId", songs[videoIndex].video_link);
  };

  render() {
    let {playlists} = this.props;
    if (playlists.length === undefined) {
      playlists = [{id: -1, name: "Searching for playlists ..."}];
    } else if (playlists.length === 0) {
      playlists = [{id: -1, name: "No playlists available."}];
    }
    const currentPlaylistId = localStorage.getItem("playlistId");
    const currentElement = document.getElementById(`playlist${currentPlaylistId}`);
    if (currentElement !== null) currentElement.style.color = "#f50057";
    return (
      <div style={{overflowY: "scroll"}}>
        {playlists.length > 0
          ? playlists.map((playlist, i) => (
              <DialogContent key={playlist.id}>
                <h3>
                  <Button
                    id={`playlist${playlist.id}`}
                    style={{color: "black"}}
                    fullWidth
                    onClick={() => {
                      this.handleTitleClick(playlist.id, i);
                    }}
                  >
                    {playlist.name}
                  </Button>
                </h3>
                {playlist.id >= 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Edit
                      currentId={this.state.currentPlaylistId}
                      handleClose={this.handleClose}
                      handleClickOpen={this.handleClickOpen}
                      id={playlist.id}
                      open={this.state.open}
                      type="playlist"
                    />
                    <Delete
                      delete={this.props.deletePlaylist}
                      getData={this.props.getPlaylists}
                      id={playlist.id}
                    />
                  </div>
                ) : (
                  ""
                )}
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
    playlists: state.playlistReducer.playlists,
  };
};

const mapDispatchToProps = {
  getPlaylist: playlistId => getPlaylist(playlistId),
  getPlaylists,
  deletePlaylist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist);
