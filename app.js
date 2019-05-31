const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.get("/break", (req, res) => {
  const url = "https://opentdb.com/api.php?amount=1000";
  axios
    .get(url)
    .then(response => {
      const questions = response.data.results.map(elem => ({
        question: elem.question,
        answer: elem.correct_answer
      }));
      // send back the array of questions
      res.send(questions);
    })
    .catch(err => {
      console.log(`Couldn't get data from trivia api: ${err}`);
    });
});

// Static hosting of built React files
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening on port ${port}`));
