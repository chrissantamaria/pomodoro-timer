import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import TimerPage from "./timer/TimerPage";
import SignIn from './authentication/signUp';

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={TimerPage} />
      <Route path="/signIn" exact component={SignIn} />
    </Router>
  );
}
