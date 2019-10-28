import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

function Previous(props) {
  return (
    <Tooltip title="Previous Song">
      <Button onClick={props.onPreviousVideo}>
        <SkipPreviousIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Previous;
