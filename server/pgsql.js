const {Client} = require('pg');
const pass = require('../config.js').pass;

const client = new Client({
  user: 'arun',
  host: 'localhost',
  database: 'qa',
  password: pass,
  port: 5432
})

