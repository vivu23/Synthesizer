const { MongoClient } = require('mongodb').MongoClient;
const assert = require("assert");
const { validationResult } = require('express-validator');
const username = process.env.UN;
const pw = process.env.PW;
const uri = "mongodb+srv://" + username + ":" + pw + "@cluster0.u5nnm.mongodb.net/test";
const dbName = 'synthesizerDB';
const dbProducts = 'credentials';
 
MongoClient.connect( uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function( err, client ) {
    if (err) throw err;
    console.log("Connected to MongoDB.");

  });