import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { resetData, uploadSheet } from "../../../Redux/Actions/dataActions";
import DragNDrop from "../../Upload/DragNDrop";

function ModalContent(props) {
  const [disabled, setDisabled] = useState(true);

  const [requestData, setRequestData] = useState({
    composer: "",
    sheetName: "",
    releaseDate: "1999-12-31",
  });

  const [uploadFile, setUploadFile] = useState(undefined);

  const giveModalData = (file) => {
    setUploadFile(file);
  };

  useEffect(() => {
    if (
      requestData.composer !== ""
      && requestData.sheetName !== ""
      && uploadFile !== undefined
    ) {
      setDisabled(false);
    }
    else if (uploadFile === undefined) {
      setDisabled(true);
    }
  }, [requestData, uploadFile]);

  const handleChange = (event) => {
    setRequestData({
      ...requestData,
      [event.target.name]: event.target.value,
    });
  };

  const sendRequest = () => {
    const newData = {
      ...requestData,
      uploadFile,
    };

    const makeCalls = (_callback) => {
      props.uploadSheet(newData, () => {
        props.resetData();
        props.onClose();
        _callback();
      });
    };

    makeCalls(() => window.location.reload());
  };

  return (
    <div className="upload">
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Sheet Name"
          className="form-field"
          name="sheetName"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Composer"
          className="form-field comp"
          name="composer"
          onChange={handleChange}
        />
      </form>
      <DragNDrop giveModalData={giveModalData} />
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={sendRequest}
      >
        Upload
      </Button>
    </div>
  );
}

const mapActionsToProps = {
  uploadSheet,
  resetData,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapActionsToProps)(ModalContent);
