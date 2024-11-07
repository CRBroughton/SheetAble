import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_SIDEBAR,
  SET_VERSION,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  sidebar: true,

  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_VERSION:
      return {
        ...state,
        version: action.payload,
      };

    default:
      return state;
  }
}
