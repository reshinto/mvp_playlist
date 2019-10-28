import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PauseIcon from "@material-ui/icons/Pause";

function Pause(props) {
  return (
    <Tooltip title="Pause Song">
      <Button onClick={props.onPauseVideo}>
        <PauseIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Pause;
