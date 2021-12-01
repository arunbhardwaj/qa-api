const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')

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
  const {product_id} = req.query;
  console.time()
  console.log('GET /qa/questions >', req.query)
  db.api.getAllQuestions(product_id)
    .then(results => {res.status(200).send(results); console.timeEnd()})
    .catch(err => {console.error(err); res.sendStatus(500)});
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let {question_id} = req.params;
  console.log('Hit questionid/answers', question_id);
  db.api.getAllAnswersForOneQuestion(question_id)
    .then(results => res.status(200).send(results))
    .catch(err => {console.error(err); res.sendStatus(500)});
})

app.post('/qa/questions', addTimeStamp, addQuestionMetaData, addReported, (req, res) => {
  console.log("POST /qa/questions");
  db.api.saveQuestion(req.body)
    .then(results => res.status(201).send(results))
    .catch(err => console.error(err));
})

app.post('/qa/questions/:question_id/answers', addTimeStamp, addAnswerMetaData, addReported, (req, res) => {
  let {question_id} = req.params;
  console.log(`POST /qa/questions/${question_id}/answers`);
  db.api.saveAnswer(req.body)
    .then(results => res.status(201).send(results))
    .catch(err => console.error(err));
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let {question_id} = req.params;
  console.log(`PUT /qa/questions/${question_id}/helpful`);
  db.api.updateQuestionHelpful(question_id)
    .then(results => res.sendStatus(201))
    .catch(err => console.error(err));
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let {answer_id} = req.params;
  console.log(`PUT /qa/questions/${answer_id}/helpful`);
  db.api.updateAnswerHelpful(answer_id)
    .then(results => res.sendStatus(201))
    .catch(err => console.error(err));
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  console.log("PUT /qa/questions/:answer_id/report");
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

// function cors(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// }
