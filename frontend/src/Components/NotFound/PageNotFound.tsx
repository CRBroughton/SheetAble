import React from "react";

import SideBar from "../Sidebar/SideBar";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <>
      <SideBar />
      <div id="notfound" className="home_content">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
            <h2>404 - The Page can't be found</h2>
          </div>
          <a href="/" className="a-button">
            Go To Homepage
          </a>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
