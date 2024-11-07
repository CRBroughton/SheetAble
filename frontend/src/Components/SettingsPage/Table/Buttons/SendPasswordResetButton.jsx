import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function SendPasswordResetButton(params) {
  const initColor = {
    color: "#5865f2",
  };
  const [colorStyle, setColorStyle] = useState(initColor);
  const [disabled, setDisabled] = useState(false);

  return (
    <IconButton
      variant="contained"
      size="small"
      style={colorStyle}
      disabled={disabled}
      onClick={() => {
        setColorStyle({ color: "grey" });
        setDisabled(true);
        setTimeout(() => {
          setColorStyle(initColor);
          setDisabled(false);
        }, 2000);
        sendReq(params.row.email);
      }}
    >
      <SendIcon />
    </IconButton>
  );
}

function sendReq(email) {
  console.log(email);
  axios.post(`/request_password_reset`, { email })
    .then((res) => {
      // window.location.reload()
    })
    .catch((err) => {
      console.error(err);
    });
}
