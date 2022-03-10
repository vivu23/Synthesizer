const { MongoClient } = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");
require("dotenv").config({ path: "server/config.env" });
const username = process.env.UN;
const pw = process.env.PW;
const uri = "mongodb+srv://" + username + ":" + pw + "@cluster0.u5nnm.mongodb.net/test";
const dbName = 'synthesizerDB';
const dbProducts = 'credentials';
 
mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true,})
.catch(err=> console.log(err));