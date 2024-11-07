import axios from "axios";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import LoadingAnimation from "../../../Images/Animations/Loading.svg";

import "./BubblyButton.css";

function RandomPieceSelection({ sheetPages, page }) {
  const [loading, setLoading] = useState(true);

  const [sheet, setSheet] = useState(undefined);

  const [bubblyButton, setBubblyButton] = useState("bubbly-button");

  const pickPiece = () => {
    setLoading(true);
    return sheetPages[page][
      Math.floor(Math.random() * sheetPages[page].length)
    ];
  };

  useEffect(() => {
    setSheet(pickPiece());
    setLoading(false);
  }, []);

  const animateButton = function (e) {
    e.preventDefault();
    // reset animation

    setBubblyButton("bubbly-button");

    setBubblyButton("bubbly-button animate");

    setSheet(pickPiece());
    setLoading(false);

    setTimeout(() => {
      setBubblyButton("bubbly-button");
    }, 700);
  };

  const history = useHistory();

  return (
    <div className="box rand-piece remove_shadow">
      {loading
        ? (
            <img className="loading-animation-rand" src={LoadingAnimation} alt="" />
          )
        : (
            <div>
              <div>
                <img
                  className="rand-img cursor"
                  src={`${axios.defaults.baseURL}/sheet/thumbnail/${sheet.safe_sheet_name}`}
                  alt="Sheet Thumbnail"
                  onClick={() =>
                    history.push(`sheet/${sheet.pdf_url.split("pdf/").pop()}`)}
                />
                <div className="sheet-name-container n-cursor">
                  <span className="sheet-name">{sheet.sheet_name}</span>
                </div>
                <div className="sheet-composer-container">
                  <span className="sheet-composer">{sheet.composer}</span>
                </div>
              </div>
              <button onClick={animateButton} className={bubblyButton}>
                Shuffle
              </button>
            </div>
          )}
    </div>
  );
}

export default RandomPieceSelection;
