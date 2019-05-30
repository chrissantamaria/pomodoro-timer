import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import Timer from "./Timer";
import SessionForm from "./SessionForm";
import useStyles from "./TimerPageStyles";
import { Redirect } from "react-router-dom";
import Logout from "../authentication/Logout";

export default function TimerPage() {
  const classes = useStyles();

  const [sessionType, setSessionType] = useState("Work");

  const changeParentSession = sess => {
    setSessionType(sess);
  };

  let user;
  if (JSON.parse(sessionStorage.getItem("user"))) {
    user = JSON.parse(sessionStorage.getItem("user"));
  } else {
    user = JSON.parse(localStorage.getItem("user"));
  }

  if (!user) {
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
