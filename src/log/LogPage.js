import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import firebase from "../firebase/firebase";

import Table from "./Table";
import useStyles from "./LogPageStyles";

export default function LogPage(props) {
  const classes = useStyles();
  const { uid } = props.user;

  const [sessions, setSessions] = useState([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log("Setting up firebase listener");
    const sessionsRef = firebase.database().ref(`sessions/${uid}`);

    sessionsRef.on("value", snap => {
      console.log("snap.val():", snap.val());
      // Mapping to an array structure with a "key" property on each object
      const snapSessions = !snap.val()
        ? []
        : Object.keys(snap.val()).map(key => ({
            ...snap.val()[key],
            key,
            // Mapping each incoming timestamp into a Date object
            date: new Date(snap.val()[key].date)
          }));
      console.log("snapSessions:", snapSessions);
      setSessions(snapSessions);
    });
    return function cleanup() {
      console.log("Removing firebase listener");
      sessionsRef.off("value");
    };
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */

  const updateSession = ({ session, key }) => {
    firebase
      .database()
      .ref(`sessions/${uid}/${key}`)
      .update(session);
    console.log(`Updated session id ${key}`);
  };
  const removeSession = key => {
    firebase
      .database()
      .ref(`sessions/${uid}/${key}`)
      .remove();
    console.log(`Deleted session id ${key}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <div className={classes.content}>
          <Table
            sessions={sessions}
            updateSession={updateSession}
            removeSession={removeSession}
          />
        </div>
      </main>
    </React.Fragment>
  );
}
