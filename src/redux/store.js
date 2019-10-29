import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import songReducer from "./reducers/songReducer";
import playlistReducer from "./reducers/playlistReducer";
import playlistSongReducer from "./reducers/playlistSongReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  authReducer,
  userReducer,
  songReducer,
  playlistReducer,
  playlistSongReducer,
});

const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
