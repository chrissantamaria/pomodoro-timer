import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import firebase from "../firebase/firebase";

import Table from "./Table";
import useStyles from "./LogPageStyles";

const userId = localStorage.getItem("userId");

export default function LogPage() {
  const classes = useStyles();

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    console.log("Setting up firebase listener");
    const sessionsRef = firebase.database().ref(`sessions/${userId}`);

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
  }, []);

  const updateSession = ({ session, key }) => {
    firebase
      .database()
      .ref(`sessions/${userId}/${key}`)
      .update(session);
    console.log(`Updated session id ${key}`);
  };
  const removeSession = key => {
    firebase
      .database()
      .ref(`sessions/${userId}/${key}`)
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
