const axios = require('axios');


//review helper functions that make the call to our server

module.exports = {
  get: function (product_id, sort, callback) {

    axios.get(`/reviews/${product_id}/${sort}`)
      .then((responseData) => {

        callback(responseData.data);
      })
      .catch((err) => {
        console.log('handler error >>>>>', err);
      })
  },

  getMeta: function (product_id, callback) {
    axios.get(`/reviews/meta/${product_id}`)
      .then((responseData) => {

        callback(responseData.data);
      })
      .catch((err) => {
        console.log('handler error >>>>>', err);
      })
  },

  post: function (body, callback) {
    axios.post('/reviews/', body)
    .then((response) => {
      callback(response);
    })
    .catch((err) => {
      console.log('post handler error >>>>>', err);
    })
  },

  update: function (review_id, action, callback) { // mark review as helpful and report review (PUT /reviews/:review_id/helpful) (PUT /reviews/:review_id/report)
    console.log('review id/action >>>', review_id, action);
    axios.put(`/reviews/${review_id}/${action}`)
    .then((responseData) => {

      callback(responseData);
    })
    .catch((err) => {
      console.log('put handler error >>>>>', err);
    })
  }
}