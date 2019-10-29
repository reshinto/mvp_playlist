import * as actionTypes from "../types";
import {updateObject} from "../utility";

const initialState = {
  playlistSongs: {},
  playlistSong: {}
};

const getPlaylistSongs = (state, action) => {
  return updateObject(state, {
    playlistSongs: action.payload,
  });
};

const getPlaylistSong = (state, action) => {
  return updateObject(state, {
    playlistSong: action.payload,
  });
};

const playlistSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYLIST_SONGS:
      return getPlaylistSongs(state, action);
    case actionTypes.GET_PLAYLIST_SONG:
      return getPlaylistSong(state, action);
    default:
      return state;
  }
};

export default playlistSongReducer;
