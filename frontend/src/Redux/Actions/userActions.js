import axios from "axios";
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER_DATA,
} from "../types";

export function loginUser(userData, history) {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/login", userData)
      .then((res) => {
        setAuthorizationHeader(res.data);
        dispatch({ type: SET_AUTHENTICATED });
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
        return err;
      })
      .then((err) => {
        if (err !== undefined) {
          return;
        }
        axios
          .get("/users/0")
          .then((res) => {
            delete res.data.password;
            dispatch({ type: SET_USER_DATA, payload: res.data });
            window.location.replace("/");
          })
          .catch((err) => {
            dispatch({
              type: SET_ERRORS,
              payload: err.response.data,
            });
          });
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common.Authorization;
    dispatch({ type: SET_UNAUTHENTICATED });
  };
}

export function createUser(userData) {
  return (dispatch) => {
    const data = {
      email: userData.email,
      password: userData.password,
    };

    axios
      .post("/users", data)
      .then((res) => {})
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  };
}

function setAuthorizationHeader(token) {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common.Authorization = FBIdToken;
}
