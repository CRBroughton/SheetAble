import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

// Redux stuff
import { connect } from "react-redux";
import { getComposers, getSheets } from "../../Redux/Actions/dataActions";

import Composers from "../Composers/Composers";

import NoSheets from "../NotFound/NoSheets";

// Sidebar
import SideBar from "../Sidebar/SideBar";
// CSS
import "./HomePage.css";
// Components
import Sheets from "../Sheets/Sheets";

class HomePage extends Component {
  componentDidMount = () => {
    // Change Page Title
    document.title = `SheetAble - Home`;

    if (this.props.sheets === undefined || this.props.sheets.length === 0) {
      this.props.getSheets();
    }

    if (
      this.props.composers === undefined
      || this.props.composers.length === 0
    ) {
      this.props.getComposers();
    }
  };

  render() {
    const sheetsTrue = (
      <div className="home_content">
        <div className="home-page-wrapper">
          <div className="space" />
          <div className="overflow-scroll">
            <span className="text">Recently Added Sheets</span>

            <hr className="seperator"></hr>

            <Sheets sheets={this.props.sheets} />
          </div>
          <div className="overflow-scroll">
            <span className="text">New Composers</span>
            <hr className="seperator"></hr>
            <Composers composers={this.props.composers} />
          </div>
        </div>
      </div>
    );

    const sheetsFalse = (
      <div id="notfound" className="home_content">
        <NoSheets />
      </div>
    );

    const loadingJSX = <h1>loading</h1>;

    return (
      <>
        <SideBar history={this.props.history} />
        {this.props.loading
          ? loadingJSX
          : this.props.sheets === undefined || this.props.sheets.length === 0
            ? sheetsFalse
            : sheetsTrue}
      </>
    );
  }
}

HomePage.propTypes = {
  getSheets: PropTypes.func.isRequired,
  getComposers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    sheets: state.data.sheets,
    composers: state.data.composers,
    loading: state.data.loading,
  };
}

const mapActionsToProps = {
  getSheets,
  getComposers,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
