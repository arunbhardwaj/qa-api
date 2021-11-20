const {Pool, Client} = require('pg');
const pass = require('../../config.js').pass;
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// For local development
const client = new Client({
  user: 'arun',
  host: 'localhost',
  database: 'qa',
  password: pass,
  port: 5432 //default port
})

// Should I change the port? It seems like it's working anyway...
const pool = new Pool({
  user: 'arun',
  host: 'localhost',
  database: 'qa',
  password: pass,
  port: 5432
});

// // FOR DOCKER CONTAINERS
// const client = new Client({
//   user: 'postgres',
//   host: 'db',
//   database: 'postgres',
//   password: 'postgres',
//   port: 5432 //default port
//   // http://location.hostname:port/
// })

// // Do I need retry logic with pools?
// const pool = new Pool({
//   user: 'postgres',
//   host: 'db',
//   database: 'postgres',
//   password: 'postgres',
//   port: 5432
// });

const startServers = async () => {
  let retries = 5;
  while (retries) {
    try {
      await client.connect()
      console.log("Connected to postgres.");
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}
startServers();


// Is this creating a new pool every time? I don't think so.
module.exports = {
  client: client,
  pool: pool
}