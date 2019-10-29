import axios from "axios";
import * as actionTypes from "../types";
import {db, tokenConfig} from "../utility";


// id = playlist_id
export const getPlaylistSongs = id => (dispatch, state) => {
  const token = localStorage.getItem("authToken");
  axios
    .get(`${db}/users/user/playlist/playlistsongs`, {
      params: {id},
      headers: {authorization: token},
    })
    .then(res => {
      dispatch({
        type: actionTypes.GET_PLAYLIST_SONGS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// id = playlist_songs_id
export const getPlaylistSong = id => (dispatch, state) => {
  const token = localStorage.getItem("authToken");
  axios
    .get(`${db}/users/user/playlist/playlistsong`, {
      params: {id},
      headers: {authorization: token},
    })
    .then(res => {
      dispatch({
        type: actionTypes.GET_PLAYLIST_SONG,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addPlaylistSongs = (playlist_id, songs_list) => (dispatch, state) => {
  axios
    .post(
      `${db}/users/user/playlist/playlistsong`,
      {
        playlist_id, songs_list
      },
      tokenConfig(state),
    )
    .then(res => {
      dispatch({
        type: actionTypes.ADD_PLAYLIST_SONGS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// export const editPlaylist = (name, id) => (dispatch, state) => {
//   axios
//     .put(
//       `${db}/users/user/playlist`,
//       {
//         name,
//         id,
//       },
//       tokenConfig(state),
//     )
//     .then(res => {
//       dispatch({
//         type: actionTypes.EDIT_PLAYLIST,
//         payload: res.data,
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// id = playlist_songs_id
export const deletePlaylistSong = id => (dispatch, state) => {
  const token = localStorage.getItem("authToken");
  axios
    .delete(`${db}/users/user/playlist/playlistsong`, {
      data: {id},
      headers: {authorization: token},
    })
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_PLAYLIST_SONG,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
