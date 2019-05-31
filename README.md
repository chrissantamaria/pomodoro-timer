# Pomodoro Timer

A simple web app to track work done using the Pomodoro Technique.

Uses React with [material-ui](https://github.com/mui-org/material-ui) for the frontend and Node with Express for the backend. Authentication and database functionality is provided by [Firebase](https://firebase.google.com/). Log table is displayed using [material-table](https://github.com/mbrn/material-table). Trivia questions are provided by the [Open Trivia Database](https://opentdb.com/).

## Usage

Run `npm install` and `npm build` and create a `.env` file with all necessary credentials (see `.env.example`).

Run the app with `npm start` and access at `http://localhost:9000`.

## Features

- Timer with presets for 25 minute work sessions and 5 minute break sessions
- Log table view of all submitted sessions
- Email authentication with protected content routes
- Fun trivia questions to view during breaks
