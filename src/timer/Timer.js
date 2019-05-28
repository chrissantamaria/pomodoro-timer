import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./TimerStyles";

export default function Timer(props) {
  const classes = useStyles();

  const [time] = useState("25:00");

  return (
    <div>
      <Box
        className={classes.timerRow}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Typography className={classes.time} variant="h1">
          {time}
        </Typography>
        <Box
          className={classes.timerSettings}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <IconButton
            onClick={() => console.log("clicked")}
            aria-label="Add minute"
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            onClick={() => console.log("clicked")}
            aria-label="Add minute"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        className={classes.controlsRow}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Button variant="contained" color="primary" className={classes.button}>
          Start
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Pause
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Reset
        </Button>
      </Box>
    </div>
  );
}
