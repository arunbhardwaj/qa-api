import axios from 'axios';

const header = {
};

const LOCAL_API = {
  questions: 'http://localhost:3000/qa/questions',
  answers: 'http://localhost:3000/qa/answers',
  // For Docker, it seems the request leaves the container and the host,
  // so it has to reenter from the host side rather than the container side.
  // E.g. client requests must go to localhost > port 3000
  // and cannot go to webserver > 3000.
  // Prior to this I was using 5000:3000 port forwarding
  // and client had to connect to localhost > 5000 instead of > 3000.
}

const EC2_API = {
  questions: 'http://ec2-3-82-220-49.compute-1.amazonaws.com/qa/questions',
  answers: 'http://ec2-3-82-220-49.compute-1.amazonaws.com/qa/answers',
}

// CHANGE THIS TO CHANGE THE ENDPOINT OF ALL THE FUNCTIONS.
const ENDPOINT = LOCAL_API;

///////////////////////////////////////////////////////
// Questions                               ////////////
///////////////////////////////////////////////////////
/**
 * Returns a promise that resolves to all questions for a given product.
 *
 * @param {number} productId The product_id you want questions for.
 * @returns {Promise<any>} Promise object representing api results
 */
export function getAllQuestions(productId) {
  return axios({
    method: 'GET',
    url: ENDPOINT.questions,
    headers: header,
    params: {
      product_id: productId
    }
  })
}

/**
 * Returns a promise that resolves to the server response to a POST request.
 *
 * @param {Object} data Object containing body params for posting: name, body, email, product_id
 * @returns {Promise<any>} Promise object resolves to api results
 */
export function postQuestion(data) {
  return axios({
    method: 'POST',
    url: ENDPOINT.questions,
    data: data,
    headers: header,
  })
}

/**
 *
 * @param {Object} data Object containing body params for answer posting: name, body, email, photos, question_id
 * @returns
 */
export function postAnswer(questionId, data) {
  return axios({
    method: 'POST',
    url: `${ENDPOINT.questions}/${questionId}/answers`,
    data: {...data, question_id: questionId},
    headers: header,
  })
}

export function updateQuestionHelpfulCount(questionId) {
  return axios({
    method: 'PUT',
    url: `${ENDPOINT.questions}/${questionId}/helpful`,
    headers: header
  })
}

export function updateAnswerHelpfulCount(answerId) {
  return axios({
    method: 'PUT',
    url: `${ENDPOINT.answers}/${answerId}/helpful`,
    headers: header
  })
}
