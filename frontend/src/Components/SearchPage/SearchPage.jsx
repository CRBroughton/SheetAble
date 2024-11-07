import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { searchData } from "../../Redux/Actions/dataActions";

import SideBar from "../Sidebar/SideBar";
import ResultBox from "./ResultBox";
import "./SearchPage.css";

function SearchPage({ searchData }) {
  const [searchValue, setSearchValue] = useState("");

  const [searchResponse, setSearchResponse] = useState([]);

  const handleSubmit = () => {
    if (searchValue !== "") {
      searchData(searchValue, (data) => {
        setSearchResponse(data);
      });
    }
  };

  /* Checks if Enter is pressed while in input */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <SideBar />
      <div className="home_content">
        <div className="search_wrapper">
          <div className="search_input_box">
            <input
              type="text"
              name="text"
              placeholder="Search for sheets"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i
              className="bx bx-search-alt-2 cursor"
              onClick={handleSubmit}
            >
            </i>
          </div>

          <ResultBox searchResponse={searchResponse} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({});

const mapActionsToProps = {
  searchData,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchPage);
