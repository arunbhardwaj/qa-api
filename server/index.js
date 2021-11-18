const express = require('express')
const morgan = require('morgan')
const pgClient = require('./db').pgClient
const port = 3000;

let app = express()

app.use(morgan('dev'))
app.use(express.static('client/dist'))

app.listen(port, () => {
  console.log("Listening on port %d...", port)
})

app.get('/qa/questions', (req, res) => {
  console.log('hit get questions');
  console.log(req);
})