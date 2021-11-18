const express = require('express')
const morgan = require('morgan')
// const pgClient = require('./db').pgClient
// const pgPool = require('./db').pgPool
const db = require('./db')

const port = 3000;

let app = express()

app.use(morgan('dev'))
app.use(express.static('client/dist'))

app.listen(port, () => {
  console.log("Listening on port %d...", port)
})

app.get('/qa/questions', (req, res) => {
  db.api.getAllQuestions(39334, 1)
    .then((results) => {console.log(results); res.status(200).send(results)})
    .catch(err => {console.error(err); res.sendStatus(500)});
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let {question_id} = req.params;
  console.log('Hit questionid/answers', question_id);
})

app.post('/qa/questions', (req, res) => {
  console.log("POST /qa/questions");
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log("POST /qa/questions/:question_id/answers");
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let {question_id} = req.params;
  console.log(`PUT /qa/questions/${question_id}/helpful`);
  db.api.updateQuestionHelpful(question_id)
    .then(results => console.log(results.rows))
    .catch(err => console.error(err));
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log("PUT /qa/questions/:answer_id/helpful");
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  console.log("PUT /qa/questions/:answer_id/helpful");
})


/*
[
  {
    id: 139025,
    question_body: 'Saepe maxime et et in.',
    question_date: 2018-08-06T04:00:00.000Z,
    asker_name: 'Gino_Mueller',
    asker_email: 'Margarette14@gmail.com',
    question_helpfulness: 21,
    reported: false,
    product_id: 39334,
    answers: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  {
    id: 139020,
    question_body: 'Quas tempora illo et iste accusantium.',
    question_date: 2018-11-18T05:00:00.000Z,
    asker_name: 'Vern18',
    asker_email: 'Ahmed_Prosacco16@yahoo.com',
    question_helpfulness: 20,
    reported: true,
    product_id: 39334,
    answers: [ [Object], [Object], [Object] ]
  },
  {
    id: 139022,
    question_body: 'Aut voluptatem deserunt vel ut aut id non nam qui.',
    question_date: 2019-06-05T04:00:00.000Z,
    asker_name: 'Madisen_Torphy',
    asker_email: 'Sarina59@hotmail.com',
    question_helpfulness: 19,
    reported: false,
    product_id: 39334,
    answers: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  {
    id: 139023,
    question_body: 'Dolorum et laudantium rerum omnis.',
    question_date: 2018-11-30T05:00:00.000Z,
    asker_name: 'Micaela35',
    asker_email: 'Halie_Herman56@hotmail.com',
    question_helpfulness: 16,
    reported: false,
    product_id: 39334,
    answers: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  {
    id: 139021,
    question_body: 'Praesentium iusto saepe autem eum quam quam.',
    question_date: 2019-05-04T04:00:00.000Z,
    asker_name: 'Hershel_Monahan49',
    asker_email: 'Trenton55@gmail.com',
    question_helpfulness: 8,
    reported: false,
    product_id: 39334,
    answers: [ [Object], [Object], [Object], [Object] ]
  }
]
*/