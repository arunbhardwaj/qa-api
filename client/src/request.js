import axios from 'axios';
import {API_KEY} from '../../config.js';

const header = {
  Authorization: API_KEY,
};

const HR_API = {
  questions: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions',
}


const LOCAL_API = {
  questions: 'http://localhost:3000/qa/questions',
  // For Docker, it seems the request leaves the container and the host,
  // so it has to reenter from the host side rather than the container side.
  // E.g. client requests must go to localhost > port 3000
  // and cannot go to webserver > 3000.
  // Prior to this I was using 5000:3000 port forwarding
  // and client had to connect to localhost > 5000 instead of > 3000.
}

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
    url: LOCAL_API.questions,
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
    // url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/',
    url: LOCAL_API.questions,
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
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/answers`,
    url: LOCAL_API.questions + `/${questionId}/answers`,
    data: {...data, question_id: questionId},
    headers: header,
  })
}

export function updateQuestionHelpfulCount(questionId) {
  return axios({
    method: 'PUT',
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/helpful`,
    url: LOCAL_API.questions + `/${questionId}/helpful`,
    headers: header
  })
}

export function updateAnswerHelpfulCount(answerId) {
  return axios({
    method: 'PUT',
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/answers/${answerId}/helpful`,
    url: `http://localhost:3000/qa/answers/${answerId}/helpful`,
    headers: header
  })
}


///////////////////////////////////////////////////////
// REVIEWS                               //////////////
///////////////////////////////////////////////////////
export function getProductReviewMeta(productId) {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta/?product_id=${productId}`
  return axios.get(url, {
    headers: header
  })
}

export function getProductReviews(productId) {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/?sort="relevant"&product_id=${productId}&count=50`
  return axios.get(url, {
    headers: header
  })
}

export function getSelectedSortByReviews(selected, productId) {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/?sort=${selected}&product_id=${productId}&count=50`
  return axios.get(url, {
    headers: header
  })
}

export function postNewReview(data) {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews`
  return axios.post(url, data, {
    headers: header
  })
}

export function putReviewAsHelpful(reviewId) {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/${reviewId}/helpful`
  return axios.put(url, {}, {
    headers: header
  })
}
export function getAllProducts() {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products', {
    headers: header,
  })
}

export function getProductInfo(productId) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}`, {
    headers: header,
  })
}

export function getProductStyles(productId) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}/styles`, {
    headers: header,
  })
}

/**
 * Returns a promise resolving to a style object if styleId exists, or empty object if it does not exist.
 *
 * @param {number} productId
 * @param {number} styleId
 * @returns
 */
export function getProductPhotosOfAStyle(productId, styleId) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}/styles`, {
    headers: header,
  })
    .then((results) => results.data.results.reduce((result, style) => {
      if (style.style_id === styleId) {
        result = style;
      }
      return result;
    }, {}));
}

export function getReviews(productId) {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/?sort="relevant"&product_id=${productId}&count=50`
  return axios.get(url, {
    headers: header
  })
}