import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useInterval from "./useInterval.js";

import useStyles from "./TimerStyles";

export default function Timer(props) {
  const classes = useStyles();
  const { sessionType } = props;

  // Initial time based upon session type
  const [time, setTime] = useState(sessionType === "Break" ? 300 : 1500);

  const [shouldRun, setShouldRun] = useState(false);

  const decrementTime = () => {
    if (time > 60) setTime(time - 60);
    else setTime(0);
  };
  const incrementTime = () => {
    setTime(time + 60);
  };

  const startTimer = () => {
    setShouldRun(true);
  };
  const stopTimer = () => {
    setShouldRun(false);
  };
  const resetTimer = () => {
    setShouldRun(false);
    if (sessionType === "Break") {
      setTime(300);
    } else {
      setTime(1500);
    }
  };

  // Custom hook similar to setInterval
  useInterval(
    () => {
      if (time === 0) {
        setShouldRun(false);
      } else {
        setTime(time - 1);
      }
    },
    // Running every second only if shouldRun is true
    shouldRun ? 1000 : null
  );

  const displayTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const leadingZero = seconds < 10 ? "0" : "";
    return `${minutes}:${leadingZero}${seconds}`;
  };

  // Runs when sessionType changes
  useEffect(() => {
    if (sessionType === "Break") {
      setShouldRun(false);
      setTime(300);
    } else {
      setShouldRun(false);
      setTime(1500);
    }
  }, [sessionType]);

  return (
    <div className={classes.timer}>
      <Box
        className={classes.timerRow}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Typography className={classes.time} variant="h1">
          {displayTime()}
        </Typography>
        <Box
          className={classes.timerSettings}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <IconButton
            className={classes.upsideDown}
            aria-label="Add minute"
            onClick={incrementTime}
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton aria-label="Remove minute" onClick={decrementTime}>
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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={startTimer}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={stopTimer}
        >
          Pause
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={resetTimer}
        >
          Reset
        </Button>
      </Box>
    </div>
  );
}
