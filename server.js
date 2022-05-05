const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const port = process.env.PORT || 5000;
const dbConnection = require("./databases/connect");
const user = require("./routes/User");
const upload = require("./routes/Upload");
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));


app.use('/login', user);
app.use('/upload', upload);


if(process.env.NODE.ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'build', 'index.html'))
  });

}

app.listen(port, (req, res) => {
  dbConnection;
  console.log(`Server listening on port: ${port}`);
});
