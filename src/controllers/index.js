const { client, pool } = require('../database/pgsql')
const { questionResFormatter, formatSubQueryAgg } = require('./responseFormatters.js');

async function getAllQuestions(productId, page=1, count=5) {
  // 2 seconds
  // 10-20 milliseconds
  // 40 millisecond cold
  let query = {
    text: 'SELECT * FROM Questions WHERE product_id = $1 ORDER BY question_helpfulness DESC LIMIT $2',
    values: [productId, count],
  }

  // 3-3.5 Second average
  // 4-6 milliseconds
  // 35 milliseconds cold
  let leftJoinQuery = {
    text: `SELECT qa.*, photos.id as photos_id, photos.url as photos_url FROM (
          SELECT
            q1.*,
            Answers.id as ans_id,
            Answers.body,
            Answers.date,
            Answers.answerer_name,
            Answers.answerer_email,
            Answers.helpfulness,
            Answers.question_id,
            Answers.reported as ans_reported
          FROM (
            SELECT * FROM Questions WHERE product_id = $1 ORDER BY question_helpfulness DESC LIMIT $2
          )
          AS q1 LEFT JOIN Answers ON q1.id = Answers.question_id ORDER BY question_helpfulness DESC, helpfulness DESC
          ) AS qa LEFT JOIN Photos ON qa.ans_id = Photos.answer_id
    `,
    values: [productId, count]
  }

  // 4-4.5 seconds
  // After index on photos -> 4-5 milliseconds warm/consistent
  // 25 milliseconds cold.
  let joinQueryWithAgg = {
    text: `
      SELECT id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported,
        (
          SELECT array_to_json(array_agg(a))
          FROM (
            SELECT id, body, date, answerer_name, answerer_email, helpfulness, question_id, reported,
            (
              SELECT array_to_json(array_agg(p))
              FROM (
                SELECT id, url
                FROM Photos
                WHERE Photos.answer_id = Answers.id
              ) p
            ) as photos
            FROM Answers
            WHERE Answers.question_id = Questions.id
            ORDER BY Answers.helpfulness DESC
          ) a
        ) as answers
      FROM Questions
      WHERE Questions.product_id = $1 ORDER BY Questions.question_helpfulness DESC LIMIT $2
    `,
    values: [productId, count]
  }

  // let results = await pool
  //   .query(query)
  //   .then(res => res.rows)
  //   .catch(err => null)
  // let questions = results.map(({id}) => id);
  // let answers = await this.getAllAnswersForAllQuestions(questions);
  // results = results.map((question, idx) => {return {...question, answers: answers[idx]}})
  // results = questionResFormatter(productId, results);


  // let innerJoinResults = await pool.query(innerJoinQuery).then(res => res.rows).catch(err => console.error(err));
  // let leftJoinResults = await pool.query(leftJoinQuery).then(res => res.rows).catch(err => console.error(err));
  let joinQueryWithAggResults = await pool.query(joinQueryWithAgg).then(res => res.rows).catch(err => console.error(err));
  // console.log(JSON.stringify(results, null, 2));
  // console.log('///////////////////////////////////////\n///////////////////////////////\n////////////////////');
  // console.log(JSON.stringify(leftJoinResults, null, 2));
  // console.log('///////////////////////////////////////\n///////////////////////////////\n////////////////////');
  // console.log(JSON.stringify(joinQueryWithAggResults, null, 2));
  // let results = leftJoinResults
  let results = formatSubQueryAgg(productId, joinQueryWithAggResults);
  return results;
}

async function getAllAnswersForAllQuestions(questionIds) {
  let results = []
  for (const questionId of questionIds) {
    let result = await getAllAnswersForOneQuestion(questionId)
    results.push(result)
  }
  return results
}

async function getAllAnswersForOneQuestion(questionId, page = 1, count = 5) {
  let query = {
    text: 'SELECT * FROM Answers WHERE question_id = $1 ORDER BY helpfulness DESC LIMIT $2',
    values: [questionId, count],
  }
  let results = await pool.query(query).then(results => results.rows).catch(err => console.error(err));

  for (let answer of results) {
    let photos = await getPhotosForAnswer(answer.id).then(results => results.rows).catch(err => console.error(err));
    answer.photos = photos;
  }

  return results;
}


async function getPhotosForAnswer(answerId) {
  return pool.query({
    text: 'SELECT * FROM Photos WHERE answer_id = $1',
    values: [answerId]
  })
}

async function updateQuestionHelpful(questionId) {
  return pool.query({
    text: 'UPDATE Questions SET question_helpfulness = question_helpfulness + 1 WHERE id = $1',
    values: [questionId]
  })
}

async function updateAnswerHelpful(answerId) {
  return pool.query({
    text: 'UPDATE Answers SET helpfulness = helpfulness + 1 WHERE id = $1',
    values: [answerId]
  })
}

module.exports.saveQuestion = async ({body, date, name, email, question_helpfulness, reported, product_id}) => {
  return pool.query({
    text: 'INSERT INTO Questions(question_body, question_date, asker_name, asker_email, question_helpfulness, reported, product_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [body, date, name, email, question_helpfulness, reported, product_id]
  })
}

module.exports.saveAnswer = async ({body, name, email, date, helpfulness, question_id, reported}) => {
  return pool.query({
    text: 'INSERT INTO Answers(body,date,answerer_name,answerer_email,helpfulness,question_id,reported) \
      VALUES ($1,$2,$3,$4,$5,$6,$7)',
    values: [body, date, name, email, helpfulness, question_id, reported]
  })
}

module.exports = {
  getAllQuestions,
  getAllAnswersForAllQuestions,
  getAllAnswersForOneQuestion,
  getPhotosForAnswer,
  updateQuestionHelpful,
  updateAnswerHelpful
}