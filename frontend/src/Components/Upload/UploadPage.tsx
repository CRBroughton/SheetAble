import React, { useState } from "react";
import SideBar from "../Sidebar/SideBar";

import DragNDrop from "./DragNDrop";

import "./Upload.css";

function UploadPage() {
  return (
    <>
      <SideBar />
      <div className="home_content">
        <InteractiveForm />
      </div>
    </>
  );
}

function InteractiveForm() {
  const [firstButtonText, setfirstButtonText] = useState("Next Step");

  const [secondButtonText, setSecondButtonText] = useState("Next Step");

  const [containerClasses, setcontainerClasses] = useState(
    "container slider-one-active",
  );

  const [requestData, setrequestData] = useState({
    uploadFile: undefined,
    composer: "",
    sheetName: "",
    releaseDate: "1999-12-31",
  });

  const firstButtonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setfirstButtonText("Saving...");
    setcontainerClasses("container center slider-two-active");
  };

  const secondButtonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSecondButtonText("Saving...");
    setcontainerClasses("container full slider-three-active");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setrequestData({
        ...requestData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div className={containerClasses}>
      <div className="steps">
        <div className="step step-one">
          {/* <div className="liner"></div> */}
          <span>Information</span>
        </div>
        <div className="step step-two">
          {/* <div className="liner"></div> */}
          <span>Upload</span>
        </div>
        <div className="step step-three">
          {/* <div className="liner"></div> */}
          <span>Conclusion</span>
        </div>
      </div>
      <div className="line">
        <div className="dot-move"></div>
        <div className="dot zero"></div>
        <div className="dot center"></div>
        <div className="dot full"></div>
      </div>
      <div className="slider-ctr">
        <div className="slider">
          <form className="slider-form slider-one">
            <h2>Type in the data of the sheet</h2>
            <label className="input">
              <input
                type="text"
                className="name"
                name="sheetName"
                placeholder="Sheet Name"
                onChange={handleChange}
              />
              <input
                type="text"
                className="name"
                name="composer"
                placeholder="Composer"
                onChange={handleChange}
              />
            </label>
            <button
              type="button"
              disabled={
                requestData.sheetName === "" || requestData.composer === ""
              }
              className="first next interactive-form-button"
              onClick={firstButtonOnClick}
            >
              {firstButtonText}
            </button>
          </form>
          <form className="slider-form slider-two">
            <h2>Upload the PDF</h2>
            <DragNDrop
              requestData={requestData}
              secondButtonOnClick={secondButtonOnClick}
              secondButtonText={secondButtonText}
            />
          </form>
          <div className="slider-form slider-three three">
            <h2>
              The Sheet,
              {" "}
              <span className="yourname">{requestData.sheetName}</span>
            </h2>
            <h3 className="minus-marg">has been succesfully uploaded</h3>
            <a className="reset" href="/">
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
