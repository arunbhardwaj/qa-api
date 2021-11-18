const {Pool, Client} = require('pg');
const pass = require('../../config.js').pass;
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: 'qa',
  password: pass,
  port: 3211
});

const client = new Client({
  user: 'arun',
  host: 'localhost',
  database: 'qa',
  password: pass,
  port: 5432 //default port
})

client.connect((err) => {
  if (err) {
    console.log("Error connecting to postgres.")
  } else {
    console.log("Connected to postgres.");
  }
})

module.exports = {
  client: client,
  pool: pool
}