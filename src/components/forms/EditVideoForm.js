import React from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {editSong} from "../../redux/actions/songAction";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class EditVideoForm extends React.Component {
  state = {
    title: "",
    artist: "",
    video_link: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    this._handleSubmit();
  };

  _handleSubmit = () => {
    const {songId} = this.props;
    const {title, artist, video_link} = this.state;
    this.submit(title, artist, video_link, songId);
  };

  onChange = prop => e => {
    this.setState({[prop]: e.target.value});
  };

  submit = (title, artist, video_link, songId) => {
    this.props.editSong(title, artist, video_link, songId);
    this.props.clickSubmit();
  };

  render() {
    let {title, artist, video_link} = this.state;
    if (title === "") {
      const {song} = this.props;
      if (song.length > 0) {
        this.setState(state => ({
          title: state.title + song[0].title,
          artist: state.artist + song[0].artist,
          video_link: state.video_link + song[0].video_link,
        }));
      }
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <TextField
            type="text"
            name="title"
            value={title}
            onChange={this.onChange("title")}
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            type="text"
            name="artist"
            value={artist}
            onChange={this.onChange("artist")}
            margin="dense"
            label="Artist"
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            type="text"
            name="video_link"
            value={video_link}
            onChange={this.onChange("video_link")}
            margin="dense"
            label="Video Link"
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
            Edit
          </Button>
        </DialogActions>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    song: state.songReducer.song,
  };
};

const mapDispatchToProps = {
  editSong: (title, artist, video_link, songId) =>
    editSong(title, artist, video_link, songId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditVideoForm);
