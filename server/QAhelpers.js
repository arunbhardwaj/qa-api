// use this file or create your own helper js file in this folder
const config = require('../config.js')
const axios = require('axios');

module.exports = {
  getQuestion: function(product_id, count) {
    return axios({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${product_id}&count=${count}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    })
  },
  getAnswers: function(question_id) {
    return axios({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${question_id}/answers`,
      headers: {
        'User-Agent': 'request',
        'Authorization':`${config.API_KEY}`
      }
    })
  },
  createQuestion: function(body, name, email, product_id) {
    return axios({
      method: 'POST',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/`,
      data: {
        body: body,
        name: name,
        email: email,
        product_id: product_id
      },
      headers: {
        'User-Agent': 'request',
        'Authorization':`${config.API_KEY}`
      }
    })
  },
  createAnswer: function(question_id, body, name, email, photos) {
    return axios({
      method: 'POST',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${question_id}/answers`,
      body: {
        question: body,
        name: name,
        email: email,
        photos: photos
      },
      headers: {
        'User-Agent': 'request',
        'Authorization':`${config.API_KEY}`
      }
    })
  },
  addToHelpfulness: function(product_id) {
    return axios({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${product_id}/helpful`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    })
  },
  reportQuestion: function(question_id) {
    return axios({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${question_id}/report`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    })
  },
  reportAnswer: function(answer_id) {
    return axios({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/answers/${answer_id}/report`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    })
  },
  addToAnswerHelpfulness: function(answer_id) {
    return axios({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/answers/${answer_id}/helpful`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    })
  }
}
