import axios from "axios";
import * as actionTypes from "../types";
import {db, tokenConfig} from "../utility";

export const getPlaylists = () => (dispatch, state) => {
  axios
    .get(`${db}/users/user/playlists`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.GET_PLAYLISTS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPlaylist = id => (dispatch, state) => {
  const token = localStorage.getItem("authToken");
  axios
    .get(`${db}/users/user/playlist`, {params: {id},
      headers: {authorization: token}})
    .then(res => {
      dispatch({
        type: actionTypes.GET_PLAYLIST,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addPlaylist = (name) => (dispatch, state) => {
  axios
    .post(
      `${db}/users/user/playlist`,
      {
        name,
      },
      tokenConfig(state),
    )
    .then(res => {
      dispatch({
        type: actionTypes.ADD_PLAYLIST,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const editPlaylist = (name, id) => (
  dispatch,
  state,
) => {
  axios
    .put(
      `${db}/users/user/playlist`,
      {
        name,
        id,
      },
      tokenConfig(state),
    )
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_PLAYLIST,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deletePlaylist = id => (dispatch, state) => {
  const token = localStorage.getItem("authToken");
  axios
    .delete(`${db}/users/user/playlist`, {
      data: {id},
      headers: {authorization: token},
    })
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_PLAYLIST,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
