const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 9000;

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://opentdb.com/api.php");
    return next();
});

app.get("/break", (req, res) => {
    const url = "https://opentdb.com/api.php?amount=1000";
    axios
        .get(url)
        .then(response => {
            // send back the array of questions
            res.send(response.data.results);
        })
        .catch(err => {
            console.log(`Couldn't get data from trivia api: ${err}`);
        });
    
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});