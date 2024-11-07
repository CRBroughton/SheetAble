import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import React from "react";

export default function RemoveButton(params) {
  return (
    <IconButton
      variant="contained"
      color="secondary"
      size="small"
      style={{ color: " #ff4a35 " }}
      onClick={() => {
        deleteUser(params.row.id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}

function deleteUser(id) {
  axios.delete(`/users/${id}`)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
}
