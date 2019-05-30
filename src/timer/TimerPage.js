import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import Timer from "./Timer";
import SessionForm from "./SessionForm";
import useStyles from "./TimerPageStyles";
import Instructions from "./Instructions";


export default function TimerPage(props) {
  const classes = useStyles();

  const { uid } = props.user;

  const [sessionType, setSessionType] = useState("Work");

  const changeParentSession = sess => {
    setSessionType(sess);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Timer sessionType={sessionType} />
          <SessionForm changeParentSession={changeParentSession} uid={uid} />
        </Paper>
        <Instructions uid={uid} />
      </main>
    </React.Fragment>
  );
}
