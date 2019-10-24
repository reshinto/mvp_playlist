import React from "react";
import {connect} from "react-redux";
import {addSong} from "../../redux/actions/songAction";
import {goTo} from "react-chrome-extension-router";
import Home from "../../pages/Home";

class addVideoForm extends React.Component {
  state = {
    title: "",
    artist: "",
    video_link: "",
  };

  handleSubmit = async e => {
    let {artist} = this.state;
    let title =
      localStorage.getItem("title") === ""
        ? this.state.title
        : localStorage.getItem("title");
    let video_link =
      localStorage.getItem("url") === ""
        ? this.state.video_link
        : localStorage.getItem("url");
    e.preventDefault();
    this.submit(title, artist, video_link);
  };

  onChange = prop => e => this.setState({[prop]: e.target.value});

  submit = (title, artist, video_link) => {
    Promise.all([
      this.props.addSong(title, artist, video_link),
      localStorage.setItem("title", ""),
      localStorage.setItem("url", ""),
    ]).then(() => {
      goTo(Home, {message: "From Home page"});
    });
  };

  render() {
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
      this.submit(title, artist, video_link);
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.onChange("title")}
          />
        </div>
        <div>
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={artist}
            onChange={this.onChange("artist")}
          />
        </div>
        <div>
          <input
            type="text"
            name="video_link"
            placeholder="URL Link"
            value={video_link}
            onChange={this.onChange("video_link")}
          />
        </div>
        <button type="submit">Add</button>
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
)(addVideoForm);
