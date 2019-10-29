import React from "react";
import {connect} from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import {getSongs} from "../../redux/actions/songAction";
import {addPlaylistSongs} from "../../redux/actions/playlistSongAction";

class AddSongsList extends React.Component {
  state = {
    // open: false,
    // currentId: 0,
    // videoId: "",
    // currentIndex: 0,
    songList: [],
    // selected: false,
  };

  // componentDidMount() {
  //   this.props.getSongs();
  // }

  // handleClickOpen = id => {
  //   this.props.getSong(id);
  //   setTimeout(() => {
  //     this.setState({open: true, currentId: id});
  //   }, 500);
  // };

  // handleClose = async () => {
  //   await this.setState({open: false});
  //   this.props.getSongs();
  // };

  handleTitleClick = async (id, i) => {
    if (document.getElementById(`text${id}`).style.color === "black") {
      document.getElementById(`text${id}`).style.color = "#f50057";
      const joined = this.state.songList.concat(id);
      this.setState({songList: joined});
    } else {
      document.getElementById(`text${id}`).style.color = "black";
      const newArray = [...this.state.songList];
      newArray.splice(i, 1);
      this.setState({songList: newArray});
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.submit();
  };

  submit = () => {
    const {songList} = this.state;
    const playlist_id = localStorage.getItem("currentPlaylist");
    this.props.addPlaylistSongs(playlist_id, songList);
    this.props.clickSubmit();
  };

  render() {
    let {songs} = this.props;
    console.log(this.state.songList);
    if (songs.length === undefined) {
      songs = [{song_id: -1, title: "Searching for songs ..."}];
    } else if (songs.length === 0) {
      songs = [{song_id: -1, title: "No songs available."}];
    }
    return (
      <div style={{overflowY: "scroll"}}>
        {songs.length > 0 ? (
          <form onSubmit={this.handleSubmit}>
            {songs.map((song, i) => (
              <>
                <DialogContent key={song.song_id}>
                  <h3>
                    <Button
                      id={`text${song.song_id}`}
                      style={{color: "black"}}
                      onClick={() => {
                        this.handleTitleClick(song.song_id, i);
                      }}
                    >
                      {song.title}
                      {song.song_id >= 0 ? " - " + song.artist : ""}
                    </Button>
                  </h3>
                  <hr />
                </DialogContent>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="Add songs to Playlist">
                    <Button fullWidth type="submit">
                      <PlaylistAddIcon fontSize="small" color="secondary" />
                    </Button>
                  </Tooltip>
                </DialogActions>
              </>
            ))}
          </form>
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
  addPlaylistSongs: (playlist_id, songList) =>
    addPlaylistSongs(playlist_id, songList),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddSongsList);
