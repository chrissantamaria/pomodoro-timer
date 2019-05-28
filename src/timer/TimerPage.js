import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "./TimerPageStyles";

export default function TimerPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h4" align="center">
            Timer
          </Typography>
        </Paper>
      </main>
    </React.Fragment>
  );
}
