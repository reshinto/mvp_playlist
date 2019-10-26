import axios from "axios";
import * as actionTypes from "../types";
import {db, tokenConfig} from "../utility";

export const getUser = () => (dispatch, state) => {
  axios
    .get(`${db}/users/user`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.GET_USER,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
