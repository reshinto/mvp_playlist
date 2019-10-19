import axios from "axios";
import * as actionTypes from "../types";

export const getInfo = () => (dispatch, state) => {
  axios
    .get("http://localhost:8080/users")
    .then(res => {
      console.log(res.data)
      dispatch({
        type: actionTypes.GET_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
