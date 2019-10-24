import React from "react";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import StarsIcon from "@material-ui/icons/Stars";
import PhonelinkEraseIcon from "@material-ui/icons/PhonelinkErase";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Dialog from "@material-ui/core/Dialog";
import SongList from "../components/SongList";
import AddVideoForm from "../components/forms/AddVideoForm";

class Navbar extends React.Component {
  state = {
    songsEvent: true,
    playlistsEvent: false,
    favoritesEvent: false,
    open: false,
  };

  handleSongs = async value => {
    await this.setState({songsEvent: value});
  };

  handlePlaylists = async value => {
    await this.setState({playlistsEvent: value});
  };

  handleFavorites = async value => {
    await this.setState({favoritesEvent: value});
  };

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  handleClickOpen = async () => {
    await this.setState({open: true});
  };

  handleClose = async () => {
    await this.setState({open: false});
    window.location.reload(false);
  };

  render() {
    const {songsEvent, playlistsEvent, favoritesEvent} = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <MusicVideoIcon
            onClick={async () => {
              await this.handleSongs(true);
              await this.handlePlaylists(false);
              await this.handleFavorites(false);
            }}
          />
          <QueueMusicIcon
            onClick={async () => {
              await this.handleSongs(false);
              await this.handlePlaylists(true);
              await this.handleFavorites(false);
            }}
          />
          <StarsIcon
            onClick={async () => {
              await this.handleSongs(false);
              await this.handlePlaylists(false);
              await this.handleFavorites(true);
            }}
          />
          <PhonelinkEraseIcon onClick={this.handleLogout} />
        </div>
        <div style={{marginTop: "20px"}}>
          {songsEvent ? (
            <>
              <QueuePlayNextIcon onClick={() => this.handleClickOpen()} />
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <AddVideoForm type="Add" />
              </Dialog>
              <SongList />
            </>
          ) : playlistsEvent ? (
            <PlaylistAddIcon />
          ) : favoritesEvent ? (
            ""
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
