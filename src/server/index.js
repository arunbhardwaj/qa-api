const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config(); // Load custom environment variables.
const db = require('../database')

const port = process.env.PORT || 3000;

let app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('client/dist'))

app.listen(port, () => {
  console.log("Listening on port %d...", port)
})

app.get('/qa/questions', (req, res) => {
  const { product_id } = req.query;
  db.api.getAllQuestions(product_id)
    .then(results => {res.status(200).send(results);})
    .catch(err => {console.error(err); res.sendStatus(500)});
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let { question_id } = req.params;
  db.api.getAllAnswersForOneQuestion(question_id)
    .then(results => res.status(200).send(results))
    .catch(err => {console.error(err); res.sendStatus(500)});
})

app.post('/qa/questions', addTimeStamp, addQuestionMetaData, addReported, (req, res) => {
  db.api.saveQuestion(req.body)
    .then(results => res.status(201).send(results))
    .catch(err => {console.error(err); res.status(400).send("Invalid request syntax.")});
})

app.post('/qa/questions/:question_id/answers', addTimeStamp, addAnswerMetaData, addReported, (req, res) => {
  let { question_id } = req.params;
  db.api.saveAnswer(req.body)
    .then(results => res.status(201).send(results))
    .catch(err => {console.error(err); res.status(400).send("Invalid request syntax.")});
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let { question_id } = req.params;
  db.api.updateQuestionHelpful(question_id)
    .then(results => res.sendStatus(201))
    .catch(err => {console.error(err); res.status(404).send()});
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let { answer_id } = req.params;
  db.api.updateAnswerHelpful(answer_id)
    .then(results => res.sendStatus(201))
    .catch(err => {console.error(err); res.status(404).send()});
})

// TODO:
app.put('/qa/answers/:answer_id/report', (req, res) => {
  // console.log("PUT /qa/questions/:answer_id/report");
  res.status(402).send("Not yet implemented.");
})


function addTimeStamp(req, res, next) {
  let time = new Date();
  req.body['date'] = time;
  next();
}

function addReported(req, res, next) {
  req.body['reported'] = false;
  next();
}

function addQuestionMetaData(req, res, next) {
  req.body['question_helpfulness'] = 0;
  next();
}

function addAnswerMetaData(req, res, next) {
  req.body['helpfulness'] = 0;
  next();
}
