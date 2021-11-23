const { client, pool } = require('./pgsql.js')
const { questionResFormatter } = require('./responseFormatters.js');

async function getAllQuestions(productId, page=1, count=5) {
  let query = {
    text: 'SELECT * FROM Questions WHERE product_id = $1 ORDER BY question_helpfulness DESC LIMIT $2',
    // 'SELECT \
    //   q1.*, \
    //   Answers.id as ans_id, \
    //   Answers.body, \
    //   Answers.date, \
    //   Answers.answerer_name, \
    //   Answers.answerer_email, \
    //   Answers.helpfulness, \
    //   Answers.question_id, \
    //   Answers.reported as ans_reported\
    // FROM (\
    //   SELECT * FROM Questions WHERE product_id = $1 ORDER BY question_helpfulness DESC LIMIT $2 \
    //   ) AS q1 INNER JOIN Answers ON q1.id = Answers.question_id'
    values: [productId, count],
  }

  let results = await pool
    .query(query)
    .then(res => res.rows)
    .catch(err => null)
  let questions = results.map(({id}) => id);
  let answers = await this.getAnswersForQuestions(questions);
  results = results.map((question, idx) => {return {...question, answers: answers[idx]}})
  results = questionResFormatter(productId, results);
  return results;
}
module.exports.getAllQuestions = getAllQuestions


async function getAnswersForQuestions(questionIds) {
  let results = []
  for (const questionId of questionIds) {
    let result = await module.exports.getAnswersForOneQuestion(questionId)
    results.push(result)
  }
  return results
}
module.exports.getAnswersForQuestions = getAnswersForQuestions


async function getAnswersForOneQuestion(questionId, page = 1, count = 5) {
  let query = {
    text: 'SELECT * FROM Answers WHERE question_id = $1 ORDER BY helpfulness DESC LIMIT $2',
    values: [questionId, count],
  }
  let results = await pool.query(query).then(results => results.rows).catch(err => console.error(err));

  for (let answer of results) {
    let photos = await module.exports.getPhotosForAnswer(answer.id).then(results => results.rows).catch(err => console.error(err));
    answer.photos = photos;
  }

  return results;
}
module.exports.getAnswersForOneQuestion = getAnswersForOneQuestion;


module.exports.getPhotosForAnswer = (answerId) => {
  return pool.query({
    text: 'SELECT * FROM Photos WHERE answer_id = $1',
    values: [answerId]
  })
}

module.exports.updateQuestionHelpful = (questionId) => {
  return pool.query({
    text: 'UPDATE Questions SET question_helpfulness = question_helpfulness + 1 WHERE id = $1',
    values: [questionId]
  })
}

module.exports.updateAnswerHelpful = (answerId) => {
  return pool.query({
    text: 'UPDATE Answers SET helpfulness = helpfulness + 1 WHERE id = $1',
    values: [answerId]
  })
}

module.exports.saveQuestion = ({body, date, name, email, question_helpfulness, reported, product_id}) => {
  return pool.query({
    text: 'INSERT INTO Questions(question_body, question_date, asker_name, asker_email, question_helpfulness, reported, product_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [body, date, name, email, question_helpfulness, reported, product_id]
  })
  /*
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  question_body VARCHAR(1000) NOT NULL,
  question_date TIMESTAMPTZ NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT false,
  product_id INTEGER NOT NULL
  */
}

module.exports.saveAnswer = ({body, name, email, date, helpfulness, question_id, reported}) => {
  return pool.query({
    text: 'INSERT INTO Answers(body,date,answerer_name,answerer_email,helpfulness,question_id,reported) \
      VALUES ($1,$2,$3,$4,$5,$6,$7)',
    values: [body, date, name, email, helpfulness, question_id, reported]
  })
  /*
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  body VARCHAR(1000) NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  question_id INTEGER NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false
  */
}