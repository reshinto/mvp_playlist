import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ShuffleIcon from "@material-ui/icons/Shuffle";

function Shuffle(props) {
  return (
    <Tooltip title="Shuffle Songs">
      <Button onClick={props.onShuffleVideo}>
        <ShuffleIcon fontSize="small" color="secondary" />
      </Button>
    </Tooltip>
  );
}

export default Shuffle;
