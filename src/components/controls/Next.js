import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SkipNextIcon from "@material-ui/icons/SkipNext";

function Next(props) {
  return (
    <Tooltip title="Next Song">
      <Button onClick={props.onNextVideo}>
        <SkipNextIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Next;
