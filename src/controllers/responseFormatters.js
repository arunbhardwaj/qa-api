const combineAndFormatQuestionWithAnswers = (productId, questionArr) => {
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

const formatLeftJoinQuestions = (productId, questionArr) => {
  let result = {
    product_id: product_id.toString(),
    results: questionArr.reduce((allQuestions, question) => {
      if (!(allQuestions[question.id])) {
        return Object.assign(allQuestions,
          Object.assign(question.answers, {
            [question.answer]: question.answer
          })
        )
      }

      return Object.assign(allQuestions, {
        [question.id]: 1
      })
    })
  }
}

const formatSubQueryAgg = (productId, questionsArr) => {
  let result = {
    product_id: productId.toString(),
    results: questionsArr.map(({id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported, answers}) => {
      return {
        question_id: id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,
        reported,
        answers: (answers) ? answers.reduce((answerObj, {id, body, date, answerer_name, answerer_email, helpfulness, reported, photos}) => {
          return Object.assign(answerObj,
            {
              [id]: {
                id,
                body,
                date,
                answerer_name,
                answerer_email,
                helpfulness,
                reported,
                photos: (photos) ? photos : []
              }
            }
        )}, {}) : {}
      }
    })
  }
  return result;
}


module.exports = {
  questionResFormatter: combineAndFormatQuestionWithAnswers,
  formatSubQueryAgg
}