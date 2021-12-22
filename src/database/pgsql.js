const {Pool, Client} = require('pg');
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = require('../server/config.js');

// // FOR DOCKER CONTAINERS
// Connection string isn't working for some reason.
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
// const connectionString1 = `postgresql://postgres:postgres@db:5432/qa`
// const pool = new Pool({connectionString1})
// const client = new Client({connectionString1})

const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  port: POSTGRES_PORT
});

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

module.exports = {
  pool: pool
}