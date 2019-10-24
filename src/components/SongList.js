import React from "react";
import {connect} from "react-redux";
import {getSongs, deleteSong} from "../redux/actions/songAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Dialog from "@material-ui/core/Dialog";
import EditIcon from "@material-ui/icons/Edit";
import AddVideoForm from "./forms/AddVideoForm";

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
    await this.setState({open: false, currentId: 0});
  };

  render() {
    const {songs} = this.props;
    return (
      <div>
        {songs.length > 0
          ? songs.map((song, i) => (
              <div key={song.id}>
                <h4>
                  {song.title} - {song.artist}
                  <span>
                    {" "}
                    <EditIcon
                      fontSize="small"
                      onClick={() => this.handleClickOpen(song.id)}
                    />
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="form-dialog-title"
                      key={song.id}
                    >
                      <AddVideoForm type="Edit" songId={this.state.currentId} />
                    </Dialog>
                    <DeleteForeverIcon
                      fontSize="small"
                      onClick={() => {
                        this.props.deleteSong(song.id);
                      }}
                    />
                  </span>
                </h4>
                <iframe
                  id={song.id}
                  title={`${song.title}|${song.artist}|${song.id}`}
                  className="songs"
                  width="300"
                  height="200"
                  src={`${song.video_link}?fs=1
                  &rel=0
                  &modestbranding=1
                  &enablejsapi=1`}
                  frameborder="0"
                  allow="encrypted-media"
                  allowfullscreen="true"
                ></iframe>
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
