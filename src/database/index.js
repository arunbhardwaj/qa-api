module.exports = {
  // Uncomment this to run my node script to copy csvs over into database; TOO SLOW
  // etl: require('./etl.js'),
  // mongodb: require('./nosql.js'),
  pgClient: require('./pgsql.js').client,
  pgPool: require('./pgsql.js').pool,
  api: require('../controllers')
}