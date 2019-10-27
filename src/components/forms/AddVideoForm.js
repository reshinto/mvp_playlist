import React from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {addSong} from "../../redux/actions/songAction";
import {getSongs} from "../../redux/actions/songAction";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class AddVideoForm extends React.Component {
  state = {
    title: "",
    artist: "",
    video_link: "",
    isUpdated: "false",
  };

  componentDidMount() {
    window.addEventListener("storage", this.handleStorageToState);
  }

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
    this.getSubmitType(title, artist, video_link, songId);
    localStorage.setItem("title", "");
    localStorage.setItem("video_link", "");
    if (localStorage.getItem("isUpdated") === "false")
      return this.props.clickSubmit();
    localStorage.setItem("isUpdated", "false");
  };

  getSubmitType = async (title, artist, video_link, songId) => {
    return await this.props.addSong(title, artist, video_link);
  };

  handleStorageToState = () => {
    const title = localStorage.getItem("title");
    const video_link = localStorage.getItem("video_link");
    if (title !== "") {
      this.setState(state => ({title}));
    }
    if (video_link !== "") {
      setTimeout(() => {
        localStorage.setItem("isUpdated", "true");
        this.setState(state => ({video_link}));
      }, 50);
    }
    if (title !== "" && video_link !== "")
      setTimeout(() => {
        this._handleSubmit();
      }, 100);
  };

  render() {
    localStorage.setItem("title", "");
    localStorage.setItem("video_link", "");
    localStorage.setItem("artist", "");
    const {title, artist, video_link} = this.state;
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
            Add
          </Button>
        </DialogActions>
      </form>
    );
  }
}

const mapDispatchToProps = {
  getSongs,
  addSong: (title, artist, video_link) => addSong(title, artist, video_link),
};

export default connect(
  null,
  mapDispatchToProps,
)(AddVideoForm);
