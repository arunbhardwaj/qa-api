// Uncomment this to run my node script to copy csvs over into database; TOO SLOW
// const etl = require('./etl.js');
module.exports = {
  pgClient: require('./pgsql.js').client,
  pgPool: require('./pgsql.js').pool,
  mongodb: require('./nosql.js'),
  api: require('./db_questions.js')
}