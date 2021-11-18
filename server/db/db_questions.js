const { client, pool } = require('./pgsql.js')
const { questionResFormatter } = require('./responseFormatters.js');

async function getAllQuestions(productId, page = 1, count = 5) {
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
    let result = await module.exports
      .getAnswersForOneQuestion(questionId)
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