import axios from 'axios';
import {API_KEY} from '../../config.js';

const header = {
  Authorization: API_KEY,
};

/**
 * Returns a promise that resolves to all questions for a given product.
 *
 * @param {number} productId The product_id you want questions for.
 * @returns {Promise<any>} Promise object representing api results
 */
export function getAllQuestions(productId) {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions', {
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
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/', data, {
    headers: header,
  })
}

/**
 *
 * @param {Object} data Object containing body params for answer posting: name, body, email, photos, question_id
 * @returns
 */
export function postAnswer(questionId, data) {
  return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/answers`, data, {
    headers: header,
    params: questionId
  })
}

export function updateQuestionHelpfulCount(questionId) {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/helpful`, {}, {
    headers: header
  })
}

export function updateAnswerHelpfulCount(answerId) {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/answers/${answerId}/helpful`, {}, {
    headers: header
  })
}

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