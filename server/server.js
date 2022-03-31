const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const dbConnection = require("./connect");
const user = require("./routes/User");

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use('/login', user);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, (req, res) => {
  dbConnection;
  console.log(`Server listening on port: ${port}`);
});
