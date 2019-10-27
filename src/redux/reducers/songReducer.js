import * as actionTypes from "../types";
import {updateObject} from "../utility";

const initialState = {
  songs: {},
  song: {}
};

const getSongs = (state, action) => {
  return updateObject(state, {
    songs: action.payload,
  });
};

const getSong = (state, action) => {
  return updateObject(state, {
    song: action.payload,
  });
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SONGS:
      return getSongs(state, action);
    case actionTypes.GET_SONG:
      return getSong(state, action);
    default:
      return state;
  }
};

export default songReducer;
