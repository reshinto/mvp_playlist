import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import LoopIcon from "@material-ui/icons/Loop";

function Loop(props) {
  return (
    <Tooltip title="Loop Songs">
      <Button onClick={props.onLoopVideo}>
        <LoopIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Loop;
