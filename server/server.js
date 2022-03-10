const express = require('express');
const app = express();

require("dotenv").config({ path: "server/config.env" });
const port = process.env.PORT || 5000;
const dbConnection = require('./connect');


// console.log that your server is up and running
app.listen(port, (req, res) => {  
  dbConnection;
  console.log( `Server listening on port: ${port}`);
});
