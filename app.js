const express = require("express");
const app = express();

const axios = require("axios");

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

const port = 9000;
app.listen(port, () => console.log(`listening on port ${port}`));
