import axios from "axios";
import { SET_SIDEBAR, SET_VERSION } from "../types";
import { logoutUser } from "./userActions";

// Set Sidebar
export function setSidebar() {
  return (dispatch) => {
    dispatch({ type: SET_SIDEBAR });
  };
}

export function getVersion() {
  return (dispatch) => {
    axios
      .get("/version")
      .then((res) => {
        dispatch({
          type: SET_VERSION,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        if (err.request.status === 401) {
          dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}
