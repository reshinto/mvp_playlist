import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

function Delete(props) {
  return (
    <Tooltip title="Delete">
      <Button
        onClick={async () => {
          await props.delete(props.id);
          setTimeout(() => {
            props.getData();
          }, 200)
        }}
      >
        <DeleteForeverIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Delete;
