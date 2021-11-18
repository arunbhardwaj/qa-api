
const questionResFormatter = (productId, questionArr) => {
  let res = {
    product_id: productId.toString(),
    results: questionArr.map(({id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported, answers}) => {
      return {
        question_id: id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,
        reported,
        answers: answers.reduce((obj, answer) => {
          return Object.assign(obj,
            {
              [answer.id]: {
                id: answer.id,
                body: answer.body,
                date: answer.date,
                answerer_name: answer.answerer_name,
                helpfulness: answer.helpfulness,
                photos: answer.photos
              }
            }
        )}, {})
      }
    })
  }
  return res;
}

module.exports = {
  questionResFormatter
}