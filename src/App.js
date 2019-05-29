import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import TimerPage from "./timer/TimerPage";
import SignUp from "./authentication/signUp";
import SignIn from "./authentication/signIn";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={TimerPage} />
      <Route path="/signUp" exact component={SignUp} />
      <Route path="/signIn" exact component={SignIn} />
    </Router>
  );
}
