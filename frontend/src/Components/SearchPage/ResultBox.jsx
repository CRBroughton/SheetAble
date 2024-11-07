import React from "react";
import SearchSvg from "../../Images/Taken.svg";

import SheetBox from "../SheetsPage/Components/SheetBox";

function ResultBox({ searchResponse }) {
  return (
    <div className="result_wrapper">
      {searchResponse.length === 0
        ? (
            <NoResults />
          )
        : (
            <Results searchResponse={searchResponse} />
          )}
    </div>
  );
}

function NoResults() {
  return (
    <div className="no_results">
      <img src={SearchSvg} alt="No results" />
      <br />
      <span>There were no results found</span>
    </div>
  );
}

function Results({ searchResponse }) {
  return (
    <div>
      {searchResponse.map((sheet) => {
        return <SheetBox sheet={sheet} key={sheet.sheet_name} />;
      })}
    </div>
  );
}

export default ResultBox;
