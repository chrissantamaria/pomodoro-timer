import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useInterval from './timerInterval.js';

import useStyles from "./TimerStyles";

export default function Timer(props) {
  const classes = useStyles();

  // initial time based upon session type
  let initialTime;
  if (props.sessionType === "Break"){
    initialTime = 300;
  } else {
    initialTime = 1500;
  }
  const [time, setTime] = useState(initialTime);
  

  // keep track of the setInterval id, initialize to -1
  const [shouldRun, setShouldRun] = useState(false);

  const decrementTime = () => {
    if (time > 60)
      setTime(time - 60);
    else
      setTime(1500);
  }
  const incrementTime = () => {
    setTime(time + 60);
  }
  
  const startTimer = () => {
    setShouldRun(true);
  }
  useInterval(() => {
    if (time === 0){
      setShouldRun(false);
    } else {
      setTime(time - 1)
    }
  }, shouldRun ? 1000 : null);
  
  const stopTimer = () => {
    setShouldRun(false);
  }
  const resetTimer = () => {
    setShouldRun(false);
    setTime(1500);
  }
  const displayTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let leadingZero = "";
    if (seconds < 10) {
      leadingZero = "0";
    }
    let display = `${minutes}:${leadingZero}${seconds}`;
    return display;
  }

  useEffect(() => {
    let initialTime;
    if (props.sessionType === "Break"){
      setShouldRun(false);
      setTime(300);
    } else {
      setShouldRun(false);
      setTime(1500);
    }
  }, [props.sessionType]);
  

  return (
    <div>
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
            aria-label="Add minute"
            onClick={incrementTime}
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            aria-label="Add minute"
            onClick={decrementTime}
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
        <Button variant="contained" color="primary" className={classes.button} onClick={startTimer}>
          Start
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={stopTimer}>
          Pause
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={resetTimer}>
          Reset
        </Button>
      </Box>
    </div>
  );
}
