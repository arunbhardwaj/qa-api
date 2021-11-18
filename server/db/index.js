module.exports = {
  // Uncomment this to run my node script to copy csvs over into database; TOO SLOW
  // etl: require('./etl.js'),
  pgClient: require('./pgsql.js').client,
  pgPool: require('./pgsql.js').pool,
  mongodb: require('./nosql.js'),
  api: require('./db_questions.js')
}