// React Router Import
import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Pages and Components
import LoginPage from "./Components/Authentication/LoginPage";
import Composer from "./Components/Composer/Composer";
import ComposersPage from "./Components/ComposersPage/ComposersPage";
import HomePageProvider from "./Components/Home/HomePageProvider";
import PageNotFound from "./Components/NotFound/PageNotFound";
import Ping from "./Components/Ping/Ping";
import Redirect from "./Components/Redirect/Redirect";
import Settings from "./Components/SettingsPage/Settings";
import Sheet from "./Components/Sheet/Sheet";
import SheetsPage from "./Components/SheetsPage/SheetsPage";
import UploadPage from "./Components/Upload/UploadPage";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { logoutUser } from "./Redux/Actions/userActions";
import { persistor, store } from "./Redux/store";
import { SET_AUTHENTICATED } from "./Redux/types";

// Axios
import axios from "axios";

// JWT
import jwtDecode from "jwt-decode";

// CSS
import "./App.css";

// import Logo from "./Images/logo.png";
import SearchPage from "./Components/SearchPage/SearchPage";
import TagsPage from "./Components/TagsPage/TagsPage";
// import ForgotPassword from "./Components/Authentication/ForgotPasswordPage";
import ForgotPasswordPage from "./Components/Authentication/ForgotPasswordPage";
import ResetPasswordPage from "./Components/Authentication/ResetPasswordPage";

// Check if started in development mode, so you can modify baseURL accordingly
// eslint-disable-next-line node/prefer-global/process
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8080/api";
}
else {
  axios.defaults.baseURL = "/api";
}

// Load token from localstorage and check it
const token = localStorage.FBIdToken;
if (token) {
  let decodedToken: { exp: number } | undefined;
  try {
    decodedToken = jwtDecode(token);
  }
  catch {
    decodedToken = undefined;
  }

  if (decodedToken !== undefined) {
    const ts = Date.now();
    const currentTime = Math.floor(ts / 1000) - 7200;
    if (decodedToken.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    }
    else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common.Authorization = token;
    }
  }
  else {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {store.getState().user.authenticated
            ? (
                <Fragment>
                  <Switch>
                    <Route exact path="/" component={HomePageProvider} />
                    <Route exact path="/upload" component={UploadPage} />
                    <Route
                      exact
                      path="/sheet/:safeComposerName/:safeSheetName"
                      component={Sheet}
                    />
                    <Route exact path="/search" component={SearchPage} />
                    <Route
                      exact
                      path="/composer/:safeComposerName"
                      component={Composer}
                    />
                    <Route exact path="/sheets" component={SheetsPage} />
                    <Route exact path="/composers" component={ComposersPage} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/ping" component={Ping} />
                    <Route exact path="/tag/:tagName" component={TagsPage} />
                    <Route component={PageNotFound} />
                    <Route
                      exact
                      path="/reset-password/:resetPasswordId"
                      component={ResetPasswordPage}
                    />
                  </Switch>
                </Fragment>
              )
            : (
                <Switch>
                  <Route exact path="/login" component={LoginPage} />
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPasswordPage}
                  />
                  <Route
                    exact
                    path="/reset-password/:resetPasswordId"
                    component={ResetPasswordPage}
                  />
                  <Route component={Redirect} />
                </Switch>
              )}
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
