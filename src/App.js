import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import NavBar from "./NavBar";

import TimerPage from "./timer/TimerPage";
import LogPage from "./log/LogPage";
import SignUp from "./authentication/signUp";
import SignIn from "./authentication/signIn";

import firebase from "./firebase/firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Creating auth event handler when App mounts
  useEffect(() => {
    firebase.auth().onAuthStateChanged(data => {
      console.log("auth changed:", data);
      if (!data) setUser(null);
      else setUser({ email: data.email, uid: data.uid });
      setLoading(false);
    });
  }, []);



  if (loading) return <div />;
  return (
    <React.Fragment>
      {/* <p>Current user state: {JSON.stringify(user)}</p> */}
      <Router>
        {user && <NavBar user={user} />}
        <PrivateRoute path="/" exact component={TimerPage} user={user} />
        <PrivateRoute path="/log" exact component={LogPage} user={user} />
        <Route path="/signIn" exact component={SignIn} />
        <Route path="/signUp" exact component={SignUp} />
      </Router>
    </React.Fragment>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? <Component user={user} {...props} /> : <Redirect to="/signIn" />
    }
  />
);
