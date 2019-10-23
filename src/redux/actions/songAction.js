import axios from "axios";
import * as actionTypes from "../types";
import {db, tokenConfig} from "../utility";

export const getSongs = () => (dispatch, state) => {
  axios
    .get(`${db}/users/user/songs`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.GET_SONGS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addSong = (title, artist, video_link) => (dispatch, state) => {
  axios
    .post(`${db}/users/user/songs`,
      {
        title, artist, video_link
      },
      tokenConfig(state)
    )
    .then(res => {
      dispatch({
        type: actionTypes.ADD_SONG,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
