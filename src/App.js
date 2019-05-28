import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import TimerPage from "./timer/TimerPage";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={TimerPage} />
    </Router>
  );
}
