// Questions: {
//   product_id: integer,
//   questions: {
//     _id: {
//       question_body: string,
//       question_date: string,
//       asker_name: string,
//       question_helpfulness: integer,
//       reported: boolean,
//       answers: {
//         _id: {
//           body: string,
//           date: Date,
//           answerer_name: string,
//           helpfulness: integer,
//           reported: boolean,
//           photos: {
//             {
//               id: integer,
//               url: string,
//             }
//           }
//         }
//       }
//     }
//   }
// }

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/qaApi')
  .then(() => console.log('Connected to mongodb.'))
  .catch(err => console.error('Error connecting to mongodb...', err));

const Questions = new mongoose.Schema({
  product_id: Number,
  questions: {
    question_id: Number,
    question_body: String,
    question_date: String,
    asker_name: String,
    question_helpfulness: Number,
    reported: Boolean,
    answers: [
      {
        answer_id: Number,
        body: String,
        date: Date,
        answerer_name: String,
        helpfulness: Number,
        reported: Boolean,
        photos: [
          {
            id: Number,
            url: String,
          },
        ],
      },
    ],
  },
})

const Question = mongoose.model('Question', Questions)

const save = () => {
  let newEntry = new Question({})
  newEntry.save()
}

module.exports = {
  save: save,
}