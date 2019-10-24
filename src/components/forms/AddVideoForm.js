import React from "react";
import {connect} from "react-redux";
import {addSong, editSong} from "../../redux/actions/songAction";
import {goTo} from "react-chrome-extension-router";
import Home from "../../pages/Home";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class AddVideoForm extends React.Component {
  state = {
    title: "",
    artist: "",
    video_link: "",
  };

  handleSubmit = async e => {
    e.preventDefault();
    const {songId} = this.props;
    let {artist} = this.state;
    let title =
      localStorage.getItem("title") === ""
        ? this.state.title
        : localStorage.getItem("title");
    let video_link =
      localStorage.getItem("url") === ""
        ? this.state.video_link
        : localStorage.getItem("url");
    this.submit(title, artist, video_link, songId);
  };

  onChange = prop => e => this.setState({[prop]: e.target.value});

  submit = (title, artist, video_link, songId) => {
    Promise.all([
      this.getSubmitType(title, artist, video_link, songId),
      localStorage.setItem("title", ""),
      localStorage.setItem("url", ""),
    ]).then(() => {
      setTimeout(() => goTo(Home, {message: "From Home page"}), 200);
      // window.location.reload(false);
    });
  };

  getSubmitType = async (title, artist, video_link, songId) => {
    const {type} = this.props;
    if (type.toLowerCase() === "add") {
      return await this.props.addSong(title, artist, video_link);
    } else if (type.toLowerCase() === "edit") {
      return await this.props.editSong(title, artist, video_link, songId);
    }
  };

  render() {
    const {type, songId} = this.props;
    console.log("song id", songId)
    let {artist} = this.state;
    let title =
      localStorage.getItem("title") === ""
        ? this.state.title
        : localStorage.getItem("title");
    let video_link =
      localStorage.getItem("url") === ""
        ? this.state.video_link
        : localStorage.getItem("url");
    if (localStorage.getItem("url") !== "") {
      this.submit(title, artist, video_link, songId);
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.onChange("title")}
          />
        </DialogContent>
        <DialogContent>
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={artist}
            onChange={this.onChange("artist")}
          />
        </DialogContent>
        <DialogContent>
          <input
            type="text"
            name="video_link"
            placeholder="URL Link"
            value={video_link}
            onChange={this.onChange("video_link")}
          />
        </DialogContent>
        <DialogActions>
          <button type="submit">{type}</button>
        </DialogActions>
      </form>
    );
  }
}

const mapDispatchToProps = {
  addSong: (title, artist, video_link) => addSong(title, artist, video_link),
  editSong: (title, artist, video_link, songId) =>
    editSong(title, artist, video_link, songId),
};

export default connect(
  null,
  mapDispatchToProps,
)(AddVideoForm);
