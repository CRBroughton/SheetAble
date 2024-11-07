import axios from "axios";
import { checkAuthErr } from "../../Utils/httpUtils";

import { store } from "../store";
import {
  DECREMENT_COMPOSER_PAGE,
  DECREMENT_SHEET_PAGE,
  INCREMENT_COMPOSER_PAGE,
  INCREMENT_SHEET_PAGE,
  LOADING_COMPOSERS,
  LOADING_DATA,
  RESET_DATA,
  SET_COMPOSER_PAGE,
  SET_COMPOSERS,
  SET_PAGE_COMPOSERS,
  SET_PAGE_SHEETS,
  SET_SHEET_PAGE,
  SET_SHEETS,
  SET_TOTAL_COMPOSER_PAGES,
  SET_TOTAL_SHEET_PAGES,
  SET_USERS_DATA,
} from "../types";
import { logoutUser } from "./userActions";

// Get all Sheets
export function getSheets() {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get("/sheets")
      .then((res) => {
        dispatch({
          type: SET_SHEETS,
          payload: res.data.rows,
        });
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);

        dispatch({
          type: SET_SHEETS,
          payload: [],
        });
      });
  };
}

/* Page navigation */
export function incrementSheetPage() {
  return (dispatch) => {
    dispatch({ type: INCREMENT_SHEET_PAGE });
  };
}

export function incrementComposerPage() {
  return (dispatch) => {
    dispatch({ type: INCREMENT_COMPOSER_PAGE });
  };
}

export function decrementSheetPage() {
  return (dispatch) => {
    dispatch({ type: DECREMENT_SHEET_PAGE });
  };
}

export function decrementComposerPage() {
  return (dispatch) => {
    dispatch({ type: DECREMENT_COMPOSER_PAGE });
  };
}

export function setSheetPage(page) {
  return (dispatch) => {
    dispatch({ type: SET_SHEET_PAGE, payload: page });
  };
}

export function setComposerPage(page) {
  return (dispatch) => {
    dispatch({ type: SET_COMPOSER_PAGE, payload: page });
  };
}

/* Get specific sheet data from page
    data parameter:
        data: {
            page: 1,
            sortBy: updated_at desc
        }
*/
export function getSheetPage(data = {}, _callback) {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });

    const bodyFormData = new FormData();
    bodyFormData.append("page", data.page === undefined ? 1 : data.page);
    bodyFormData.append("limit", 50);
    bodyFormData.append(
      "sort_by",
      data.sortBy === undefined ? "updated_at desc" : data.sortBy,
    );

    if (data.composer !== undefined) {
      bodyFormData.append("composer", data.composer);
    }

    axios
      .post("/sheets", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({
          type: SET_PAGE_SHEETS,
          payload: res.data.rows,
          page: data.page,
          composer: data.composer,
        });
        dispatch({
          type: SET_TOTAL_SHEET_PAGES,
          payload: res.data.total_pages,
        });
        _callback();
      })
      .catch((err) => {
        if (err.request && err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

/* Get specific composer data from page
    data parameter:
        data: {
            page: 1,
            sortBy: updated_at desc
        }
*/
export function getComposerPage(data = {}, _callback) {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });

    const bodyFormData = new FormData();
    bodyFormData.append("page", data.page === undefined ? 1 : data.page);
    bodyFormData.append("limit", 50);
    bodyFormData.append(
      "sort_by",
      data.sortBy === undefined ? "updated_at desc" : data.sortBy,
    );

    axios
      .post("/composers", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({
          type: SET_PAGE_COMPOSERS,
          payload: res.data.rows,
          page: data.page,
        });
        dispatch({
          type: SET_TOTAL_COMPOSER_PAGES,
          payload: res.data.total_pages,
        });

        _callback();
      })
      .catch((err) => {
        console.log(err);

        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
      });
  };
}

// Get all composers sorted by newest
export function getComposers() {
  return (dispatch) => {
    dispatch({ type: LOADING_COMPOSERS });
    axios
      .get("/composers")
      .then((res) => {
        dispatch({
          type: SET_COMPOSERS,
          payload: res.data.rows,
        });
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }

        console.log(err);
        dispatch({
          type: SET_COMPOSERS,
          payload: [],
        });
      });
  };
}

// Upload a sheet
export function uploadSheet(data, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("uploadFile", data.uploadFile);
    bodyFormData.append("sheetName", data.sheetName);
    bodyFormData.append("composer", data.composer);
    bodyFormData.append("releaseDate", data.releaseDate);

    axios
      .post("/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        _callback();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }

        console.log(err);
      });
  };
}

// Update a sheet
export function updateSheet(data, origSheetName, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("uploadFile", data.uploadFile);
    bodyFormData.append("sheetName", data.sheetName);
    bodyFormData.append("composer", data.composer);
    bodyFormData.append("releaseDate", data.releaseDate);

    axios
      .put(`/sheet/${origSheetName}`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        _callback();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }

        console.log(err);
      });
  };
}

// Delete a sheet
export function deleteSheet(origSheetName, _callback) {
  return (dispatch) => {
    axios
      .delete(`/sheet/${origSheetName}`)
      .then((res) => {
        _callback();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function editComposer(origName, name, epoch, file, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("epoch", epoch);
    if (file !== undefined) {
      bodyFormData.append("portrait", file);
    }

    axios
      .put(`/composer/${origName}`, bodyFormData)
      .then(() => {
        _callback();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function deleteComposer(name, _callback) {
  return (dispatch) => {
    axios
      .delete(`/composer/${name}`)
      .then(() => {
        _callback();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function searchData(searchValue, _callback) {
  return (dispatch) => {
    axios
      .get(`/search/${searchValue}`)
      .then((res) => {
        _callback(res.data);
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function getTagSheets(tagName, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("tagValue", tagName);

    axios
      .post("/tag", bodyFormData)
      .then((res) => {
        _callback(res.data);
      })
      .catch((err) => {
        if (err.request && err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function addNewTag(tagName, sheetName, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("tagValue", tagName);

    axios
      .post(`/tag/sheet/${sheetName}`, bodyFormData)
      .then((res) => {
        store.dispatch(resetData());
        window.location.reload();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function deleteTag(tagName, sheetName, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("tagValue", tagName);

    axios
      .post(`/tag/delete/sheet/${sheetName}`, bodyFormData)
      .then((res) => {
        store.dispatch(resetData());
        window.location.reload();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function editInfoText(infoText, sheetName, _callback) {
  return (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.append("informationText", infoText);

    axios
      .post(`/sheet/${sheetName}/info`, bodyFormData)
      .then(() => {
        store.dispatch(resetData());
        window.location.reload();
      })
      .catch((err) => {
        if (err.request.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        console.log(err);
      });
  };
}

export function getUsersData() {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get("/users")
      .then((res) => {
        dispatch({
          type: SET_USERS_DATA,
          payload: res.data,
        });
      })
      .catch(err => checkAuthErr(err, dispatch));
  };
}

export function resetData() {
  return (dispatch) => {
    dispatch({ type: RESET_DATA });
  };
}
