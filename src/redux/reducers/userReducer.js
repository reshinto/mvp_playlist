import * as actionTypes from "../types";
import {updateObject} from "../utility";

const initialState = {
  user: {},
};

const getUser = (state, action) => {
  return updateObject(state, {
    user: action.payload,
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return getUser(state, action);
    default:
      return state;
  }
};

export default userReducer;
