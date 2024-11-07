import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getTagSheets } from "../../Redux/Actions/dataActions";
import { dominantColors } from "../../Utils/colors";
import SheetBox from "../SheetsPage/Components/SheetBox";
import SideBar from "../Sidebar/SideBar";
import "./TagsPage.css";

function TagsPage({ getTagSheets }) {
  const { tagName } = useParams();
  const decoded = decodeURIComponent(tagName);

  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    getTagSheets(decoded, (data) => {
      setSheets(data);
    });
  }, []);

  return (
    <>
      <SideBar />
      <div className="home_content tags_page">
        <div className="header">
          <span
            className="dot"
            style={{
              backgroundColor:
                dominantColors[
                  Math.floor(Math.random() * dominantColors.length)
                ],
            }}
          />
          <h1>{decoded}</h1>
        </div>
        <div className="marg">
          {sheets.length === 0
            ? (
                <p>loading</p>
              )
            : (
                sheets.map((sheet) => {
                  return <SheetBox sheet={sheet} key={sheet.sheet_name} />;
                })
              )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({});

const mapActionsToProps = {
  getTagSheets,
};

export default connect(mapStateToProps, mapActionsToProps)(TagsPage);
