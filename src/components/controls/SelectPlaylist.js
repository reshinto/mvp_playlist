import React from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import {getPlaylists} from "../../redux/actions/playlistAction";
import {getPlaylistSongs} from "../../redux/actions/playlistSongAction";
import AddSongsList from "../../components/lists/AddSongsList";
import PlaylistSongsList from "../../components/lists/PlaylistSongsList";

class SelectPlaylist extends React.Component {
  state = {
    currentPlaylistId: "",
    songListOpen: false,
    playlistSongsListOpen: false,
  };

  componentDidMount() {
    this.props.getPlaylists();
    this.interval = setInterval(() => {
      if (
        this.state.currentPlaylistId !== localStorage.getItem("currentPlaylist")
      ) {
        this.props.getPlaylistSongs(parseInt(localStorage.getItem("currentPlaylist")));
      }
    }, 100);
  }

  componentDidUpdate(prevProps) {
    if (this.props.playlists.length !== prevProps.playlists.length) {
      this.props.getPlaylists();
      // this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  handleClickSongListOpen = async () => {
    await this.setState({songListOpen: true});
  };

  handleClickPlaylistSongsListOpen = async () => {
    this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
    await this.setState({playlistSongsListOpen: true});
  };

  handleClose = async () => {
    this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
    await this.setState({
      songListOpen: false,
      playlistSongsListOpen: false,
    });
  };

  render() {
    const {playlists} = this.props;
    const {currentPlaylistId} = this.state;
    if (currentPlaylistId === "") {
      this.setState({
        currentPlaylistId: localStorage.getItem("currentPlaylist"),
      });
    } else {
      localStorage.setItem("currentPlaylist", `${currentPlaylistId}`);
    }
    return (
      <div style={{color: "white"}}>
        <FormControl style={{color: "white"}}>
          <NativeSelect
            value={currentPlaylistId}
            onChange={this.handleChange("currentPlaylistId")}
            name="currentPlaylistId"
            inputProps={{"aria-label": "currentPlaylistId"}}
            style={{color: "white"}}
          >
            <option value={0} style={{color: "white"}}>
              Select Playlist
            </option>
            {playlists.length > 0
              ? playlists.map((playlist, i) => (
                  <option
                    key={i}
                    id={playlist.playlist_id}
                    value={playlist.playlist_id}
                    onClick={() => {
                      this.props.getPlaylistSongs(playlist.playlist_id);
                      console.log("runned getPlaylists");
                      localStorage.setItem(
                        "currentPlaylist",
                        playlist.playlist_id,
                      );
                    }}
                  >
                    {playlist.name}
                  </option>
                ))
              : ""}
          </NativeSelect>
        </FormControl>
        {playlists.length > 0 &&
        parseInt(localStorage.getItem("currentPlaylist")) > 0 ? (
          <>
            <Tooltip title="Add Songs to Playlist">
              <Button onClick={() => this.handleClickSongListOpen()}>
                <AddToQueueIcon color="secondary" />
              </Button>
            </Tooltip>
            <Dialog
              open={this.state.songListOpen}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <AddSongsList clickSubmit={this.handleClose} />
            </Dialog>
            <Tooltip title="View Playlist Songs List">
              <Button onClick={() => this.handleClickPlaylistSongsListOpen()}>
                <SubscriptionsIcon color="secondary" />
              </Button>
            </Tooltip>
            <Dialog
              open={this.state.playlistSongsListOpen}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <PlaylistSongsList clickSubmit={this.handleClose} />
            </Dialog>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlists: state.playlistReducer.playlists,
    playlistSongs: state.playlistSongReducer.playlistSongs,
  };
};

const mapDispatchToProps = {
  getPlaylists,
  getPlaylistSongs: playlist_id => getPlaylistSongs(playlist_id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectPlaylist);
