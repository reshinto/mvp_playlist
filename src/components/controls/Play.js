import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function Play(props) {
  return (
    <Tooltip title="Play Song">
      <Button onClick={props.onPlayVideo}>
        <PlayArrowIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Play;
