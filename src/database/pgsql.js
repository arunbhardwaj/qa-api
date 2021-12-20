const {Pool, Client} = require('pg');
// const pass = require('../../config.js').pass;
// you can probably just require it anyway
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = require('../server/config.js');

// // For local development
// const client = new Client({
//   user: 'arun',
//   host: 'localhost',
//   database: 'qa',
//   password: pass,
//   port: 5432 //default port
// })

// // Should I change the port? It seems like it's working anyway...
// const pool = new Pool({
//   user: 'arun',
//   host: 'localhost',
//   database: 'qa',
//   password: pass,
//   port: 5432
// });

// // FOR DOCKER CONTAINERS
// Connection string isn't working for some reason.
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
// const connectionString1 = `postgresql://postgres:postgres@db:5432/qa`
// const pool = new Pool({connectionString1})
// const client = new Client({connectionString1})

// console.log(process.env);

// NOTE: If you change the POSTGRES_VARIABLE to just the variable name that the pool
// config wants (e.g. user, password, host) then you can shorten your code a bit.
const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  port: POSTGRES_PORT
});

// const client = new Client({
//     user: 'postgres',
//     host: 'db',
//     database: 'qa',
//     password: 'postgres',
//     port: 5432 //default port
// })

// client.connect()
//   .then(() => console.log('Client connected to db.'))
//   .catch(err => console.error(err, connectionString2));

pool.on('connect', (client) => {
  console.log('Pool connected to db.')
})

// Do I need retry logic with pools?
// const startServers = async () => {
//   let retries = 5;
//   while (retries) {
//     try {
//       await client.connect()
//       console.log("Connected to postgres.");
//       break;
//     } catch (err) {
//       console.log(err);
//       retries -= 1;
//       console.log(`retries left: ${retries}`);
//       await new Promise(res => setTimeout(res, 1000));
//     }
//   }
// }
// startServers();


// Is this creating a new pool every time? I don't think so.
module.exports = {
  pool: pool
}