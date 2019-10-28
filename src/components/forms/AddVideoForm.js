import React from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {addSong} from "../../redux/actions/songAction";
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
    this.interval = setInterval(this.handleStorageToState, 100);
    // window.addEventListener("storage", this.handleStorageToState);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = e => {
    e.preventDefault();
    this._handleSubmit();
  };

  _handleSubmit = () => {
    const {title, artist, video_link} = this.state;
    this.submit(title, artist, video_link);
  };

  onChange = prop => e => {
    this.setState({[prop]: e.target.value});
  };

  submit = (title, artist, video_link) => {
    this.props.addSong(title, artist, video_link);
    localStorage.setItem("title", "");
    localStorage.setItem("video_link", "");
    if (localStorage.getItem("isUpdated") === "false")
      return this.props.clickSubmit();
    localStorage.setItem("isUpdated", "false");
  };

  handleStorageToState = () => {
    const title = localStorage.getItem("title");
    const video_link = localStorage.getItem("video_link");
    if (title !== "") {
      this.setState(state => ({title}));
    }
    if (video_link !== "") {
      localStorage.setItem("isUpdated", "true");
      this.setState(state => ({video_link}));
    }
    if (title !== "" && video_link !== "") this._handleSubmit();
  };

  render() {
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
  addSong: (title, artist, video_link) => addSong(title, artist, video_link),
};

export default connect(
  null,
  mapDispatchToProps,
)(AddVideoForm);
