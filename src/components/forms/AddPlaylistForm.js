import React from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {addPlaylist} from "../../redux/actions/playlistAction";

class AddPlaylistForm extends React.Component {
  state = {
    name: "",
    // isUpdated: "false",
  };

  // componentDidMount() {
  //   this.interval = setInterval(this.handleStorageToState, 100);
  // window.addEventListener("storage", this.handleStorageToState);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  handleSubmit = e => {
    e.preventDefault();
    this._handleSubmit();
  };

  _handleSubmit = () => {
    this.submit(this.state.name);
  };

  onChange = prop => e => {
    this.setState({[prop]: e.target.value});
  };

  submit = name => {
    this.props.addPlaylist(name);
    // localStorage.setItem("playlistName", "");
    this.props.clickSubmit();
  };

  // handleStorageToState = () => {
  //   const title = localStorage.getItem("title");
  //   const video_link = localStorage.getItem("video_link");
  //   if (title !== "") {
  //     this.setState(state => ({title}));
  //   }
  //   if (video_link !== "") {
  //     localStorage.setItem("isUpdated", "true");
  //     this.setState(state => ({video_link}));
  //   }
  //   if (title !== "" && video_link !== "") this._handleSubmit();
  // };

  render() {
    const {name} = this.state;
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
            Create Playlist
          </Button>
        </DialogActions>
      </form>
    );
  }
}

const mapDispatchToProps = {
  addPlaylist: name => addPlaylist(name),
};

export default connect(
  null,
  mapDispatchToProps,
)(AddPlaylistForm);
