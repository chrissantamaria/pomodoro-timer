import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";
import he from "he";

export default function Trivia() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);

  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(null);

  const randomQuestion = questions =>
    questions[Math.floor(Math.random() * questions.length)];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    nextQuestion();
  };
  const nextQuestion = () => setQuestion(randomQuestion(questions));

  // Get the questions
  useEffect(() => {
    axios
      .get("/break")
      .then(res => {
        setQuestions(res.data);
        setQuestion(randomQuestion(res.data));
      })
      .catch(err => {
        console.error("Couldn't get trivia from server:", err);
        setWarning("Failed to fetch trivia questions");
      });
  }, []);

  const renderDialog = ({ question, answer }) => (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Trivia Question</DialogTitle>
      <DialogContent>
        <DialogContentText>Q: {he.decode(question)}</DialogContentText>
        <DialogContentText>A: {he.decode(answer)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={nextQuestion} color="primary" autoFocus>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Get Trivia</Button>
      {question && renderDialog(question)}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={!!warning}
        autoHideDuration={4000}
        onClose={() => setWarning(null)}
        message={<span>{warning}</span>}
      />
    </React.Fragment>
  );
}
