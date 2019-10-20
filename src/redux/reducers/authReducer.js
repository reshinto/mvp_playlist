import * as actionTypes from "../types";
import {updateObject} from "../utility";

const initialState = {
  users: {},
};

const getInfo = (state, action) => {
  return updateObject(state, {
    users: action.payload,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INFO:
      return getInfo(state, action);
    default:
      return state;
  }
};

export default authReducer;
