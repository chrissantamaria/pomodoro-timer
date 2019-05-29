import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import Timer from "./Timer";
import SessionForm from "./SessionForm";
import useStyles from "./TimerPageStyles";
import { Redirect } from "react-router-dom";

export default function TimerPage() {
  const classes = useStyles();

  const [sessionType, setSessionType] = useState("Work");

  const changeParentSession = sess => {
    setSessionType(sess);
  };

  if (!sessionStorage.getItem("userId")) {
    return <Redirect to="/signIn" />
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Timer sessionType={sessionType} />
          <SessionForm changeParentSession={changeParentSession} />
        </Paper>
      </main>
    </React.Fragment>
  );
}
