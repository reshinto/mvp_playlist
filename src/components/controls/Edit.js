import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import EditVideoForm from "../forms/EditVideoForm";
import EditPlaylistForm from "../forms/EditPlaylistForm";

function Edit(props) {
  console.log(props.currentId)
  const getForm = {
    video: (
      <EditVideoForm songId={props.currentId} clickSubmit={props.handleClose} />
    ),
    playlist: (
      <EditPlaylistForm
        playlistId={props.currentId}
        clickSubmit={props.handleClose}
      />
    ),
  };
  return (
    <>
      <Tooltip title="Edit">
        <Button
          onClick={() => {
            props.handleClickOpen(props.id);
          }}
        >
          <EditIcon fontSize="small" color="secondary" />
        </Button>
      </Tooltip>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {getForm[props.type]}
      </Dialog>
    </>
  );
}

export default Edit;
