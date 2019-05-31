import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
      if (!data) setUser(null);
      else setUser({ email: data.email, uid: data.uid });
      setLoading(false);
    });
  }, []);

  const [theme, setTheme] = useState(
    createMuiTheme({
      palette: {
        type: "light"
      }
    })
  );
  const handleThemeChange = color => {
    setTheme(
      createMuiTheme({
        palette: {
          type: color
        }
      })
    );
  };

  if (loading) return <div />;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Only showing navbar when successfully authenticated */}
        {user && <NavBar user={user} handleThemeChange={handleThemeChange} />}
        <PrivateRoute path="/" exact component={TimerPage} user={user} />
        <PrivateRoute path="/log" exact component={LogPage} user={user} />
        <Route path="/signIn" exact component={SignIn} />
        <Route path="/signUp" exact component={SignUp} />
      </Router>
    </MuiThemeProvider>
  );
}

// Custom Route which takes in the current user state to check if
// someone should be able to visit the specified route. Also passes
// the user object to the component as a prop
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? <Component user={user} {...props} /> : <Redirect to="/signIn" />
    }
  />
);
