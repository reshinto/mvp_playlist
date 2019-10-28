import React from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {editPlaylist, getPlaylists} from "../../redux/actions/playlistAction";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class EditPlaylistForm extends React.Component {
  state = {
    name: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    this._handleSubmit();
  };

  _handleSubmit = () => {
    const {playlistId} = this.props;
    const {name} = this.state;
    this.submit(name, playlistId);
  };

  onChange = prop => e => {
    this.setState({[prop]: e.target.value});
  };

  submit = (name, playlistId) => {
    this.props.editPlaylist(name, playlistId);
    this.props.getPlaylists();
    this.props.clickSubmit();
  };

  render() {
    let {name} = this.state;
    if (name === "") {
      const {playlist} = this.props;
      if (playlist.length > 0) {
        this.setState(state => ({name: state.name + playlist[0].name}));
      }
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <TextField
            type="text"
            name="name"
            value={name}
            onChange={this.onChange("name")}
            autoFocus
            margin="dense"
            label="Playlist Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button fullWidth color="primary" type="submit">
            Edit Playlist
          </Button>
        </DialogActions>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist,
  };
};

const mapDispatchToProps = {
  getPlaylists,
  editPlaylist: (name, playlistId) =>
    editPlaylist(name, playlistId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPlaylistForm);
