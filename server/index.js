const express = require('express');
const port = 3000;

let app = express()

app.use(express.static('client/dist'))

app.listen(port, () => {
  console.log("Listening on port %d...", port)
})