import * as actionTypes from "../types";
import {updateObject} from "../utility";

const initialState = {
  playlists: {},
  playlist: {}
};

const getPlaylists = (state, action) => {
  return updateObject(state, {
    playlists: action.payload,
  });
};

const getPlaylist = (state, action) => {
  return updateObject(state, {
    playlist: action.payload,
  });
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYLISTS:
      return getPlaylists(state, action);
    case actionTypes.GET_PLAYLIST:
      return getPlaylist(state, action);
    default:
      return state;
  }
};

export default playlistReducer;
