import * as actionTypes from "../types";
import {updateObject} from "../utility";

const initialState = {
  songs: {},
};

const getSongs = (state, action) => {
  return updateObject(state, {
    songs: action.payload,
  });
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SONGS:
      return getSongs(state, action);
    default:
      return state;
  }
};

export default songReducer;
