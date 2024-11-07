import PropTypes from "prop-types";
import React, { Component } from "react";

// Redux stuff
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

// Pages
import HomePage from "./HomePage";

class HomePageProvider extends Component {
  render() {
    const loggedIn = this.props.authenticated;
    if (loggedIn) {
      return <HomePage history={this.props.history} />;
    }

    return <Redirect to="/login" />;
  }
}

HomePageProvider.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(HomePageProvider);
