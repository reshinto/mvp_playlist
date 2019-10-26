import React from "react";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import StarsIcon from "@material-ui/icons/Stars";
import StarIcon from '@material-ui/icons/Star';
import PhonelinkEraseIcon from "@material-ui/icons/PhonelinkErase";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CurrentSong from "../components/CurrentSong";
import SongList from "../components/SongList";
import AddVideoForm from "../components/forms/AddVideoForm";

class Navbar extends React.Component {
  state = {
    songsEvent: true,
    playlistsEvent: false,
    favoritesEvent: false,
    videoFormOpen: false,
    songListOpen: false,
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
    window.location.reload(false);
  };

  handleClickVideoFormOpen = async () => {
    await this.setState({videoFormOpen: true});
  };

  handleClickSongListOpen = async () => {
    await this.setState({songListOpen: true});
  };

  handleClose = async () => {
    await this.setState({videoFormOpen: false});
    await this.setState({songListOpen: false});
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
          <Tooltip title="Songs">
            <Button
              onClick={async () => {
                await this.handleSongs(true);
                await this.handlePlaylists(false);
                await this.handleFavorites(false);
              }}
            >
              <MusicVideoIcon color="secondary" />
            </Button>
          </Tooltip>
          <Tooltip title="Playlists">
            <Button
              onClick={async () => {
                await this.handleSongs(false);
                await this.handlePlaylists(true);
                await this.handleFavorites(false);
              }}
            >
              <QueueMusicIcon color="secondary" />
            </Button>
          </Tooltip>
          <Tooltip title="Favorites">
            <Button
              onClick={async () => {
                await this.handleSongs(false);
                await this.handlePlaylists(false);
                await this.handleFavorites(true);
              }}
            >
              <StarsIcon color="secondary" />
            </Button>
          </Tooltip>
          <Tooltip title="Logout">
            <Button onClick={this.handleLogout}>
              <PhonelinkEraseIcon color="secondary" />
            </Button>
          </Tooltip>
        </div>
        <div style={{marginTop: "20px"}}>
          {songsEvent ? (
            <>
              <Tooltip title="View Song List">
                <Button onClick={() => this.handleClickSongListOpen()}>
                  <SubscriptionsIcon color="secondary" />
                </Button>
              </Tooltip>
              <Dialog
                open={this.state.songListOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <SongList />
              </Dialog>
              <Tooltip title="Add Song">
                <Button onClick={() => this.handleClickVideoFormOpen()}>
                  <QueuePlayNextIcon color="secondary" />
                </Button>
              </Tooltip>
              <Dialog
                open={this.state.videoFormOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <AddVideoForm type="Add" clickSubmit={this.handleClose}/>
              </Dialog>
              <CurrentSong />
            </>
          ) : playlistsEvent ? (
            <Tooltip title="Add Playlist">
              <Button>
                <PlaylistAddIcon color="secondary" />
              </Button>
            </Tooltip>
          ) : favoritesEvent ? (
            <Tooltip title="Add Like">
              <Button>
                <StarIcon fontSize="small" color="secondary" />
              </Button>
            </Tooltip>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
