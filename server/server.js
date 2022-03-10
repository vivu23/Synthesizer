const express = require('express');
const app = express();

require("dotenv").config({ path: "server/config.env" });
const port = process.env.PORT || 5000;
const dbConnection = require('./connect');


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  dbConnection;
  console.log("Hello");
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});