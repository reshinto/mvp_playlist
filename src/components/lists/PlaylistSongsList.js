import React from "react";
import {connect} from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import {
  getPlaylistSongs,
  deletePlaylistSong,
} from "../../redux/actions/playlistSongAction";
import Delete from "../controls/Delete";

class SongList extends React.Component {
  state = {
    open: false,
    currentId: 0,
    videoId: "",
    currentIndex: 0,
    // selected: false,
  };

  componentDidMount() {
    // this.props.getSongs();
    this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
  }

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

  handleTitleClick = async (id, videoIndex) => {
    console.log("playlist song id", id)
    const {playlistSongs} = this.props;
    if (playlistSongs.length > 0) {
      document.getElementById(
        `playlistSongText${localStorage.getItem("playlistSongsId")}`,
      ).style.color = "black";
      document.getElementById(`playlistSongText${id}`).style.color = "#f50057";
      localStorage.setItem("currentPlaylistSongsIndex", videoIndex);
      localStorage.setItem("playlistSongsId", id);
      localStorage.setItem("playlistSongId", playlistSongs[videoIndex].song_id);
      localStorage.setItem("playlistSongTitle", playlistSongs[videoIndex].title);
      localStorage.setItem(
        "playlistVideoId",
        playlistSongs[videoIndex].video_link,
      );
    }
  };

  render() {
    let {playlistSongs} = this.props;
    console.log(playlistSongs);
    console.log(playlistSongs);
    if (playlistSongs.length === undefined) {
      playlistSongs = [
        {playlist_songs_id: -1, title: "Searching for songs ..."},
      ];
      this.props.getPlaylistSongs(localStorage.getItem("currentPlaylist"));
    } else if (playlistSongs.length === 0) {
      playlistSongs = [{playlist_songs_id: -1, title: "No songs available."}];
    }
    const currentPlaylistSongsId = localStorage.getItem("playlistSongsId");
    const currentElement = document.getElementById(
      `playlistSongText${currentPlaylistSongsId}`,
    );
    if (currentElement !== null) currentElement.style.color = "#f50057";
    return (
      <div style={{overflowY: "scroll"}}>
        {playlistSongs.length > 0
          ? playlistSongs.map((song, i) => (
              <DialogContent key={song.playlist_songs_id}>
                <h3>
                  <Button
                    id={`playlistSongText${song.playlist_songs_id}`}
                    style={{color: "black"}}
                    onClick={() => {
                      this.handleTitleClick(song.playlist_songs_id, i);
                    }}
                  >
                    {song.title}
                    {song.playlist_songs_id >= 0 ? " - " + song.artist : ""}
                  </Button>
                </h3>
                {song.playlist_songs_id >= 0 ? (
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
                    <Delete
                      delete={this.props.deletePlaylistSong}
                      getData={() =>
                        this.props.getPlaylistSongs(
                          localStorage.getItem("currentPlaylist"),
                        )
                      }
                      id={song.playlist_songs_id}
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
    playlistSongs: state.playlistSongReducer.playlistSongs,
  };
};

const mapDispatchToProps = {
  getPlaylistSongs: playlist_id => getPlaylistSongs(playlist_id),
  deletePlaylistSong: playlist_songs_id =>
    deletePlaylistSong(playlist_songs_id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongList);
