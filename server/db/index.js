// Uncomment this to run my node script to copy csvs over into database; TOO SLOW
// const etl = require('./etl.js');
module.exports = {
  pgClient: require('./pgsql.js'),
  mongodb: require('./nosql.js')
}