const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const { ignore } = require("nodemon/lib/rules");
const { Binary } = require("mongodb");
require("dotenv").config({ path: "config.env" });
const username = process.env.UN;
const pw = process.env.PW;
const uri = "mongodb+srv://" + username + ":" + pw + "@cluster0.u5nnm.mongodb.net/synthesizerDB?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true}, function( err, client ) {
    if (err) throw err;
    console.log("Connected to MongoDB.");
});

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});
  
var User = mongoose.model("users", userSchema);

module.exports = {
	checkLogin(req, res){
        console.log("Checking login credentials...");

        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).jsonp(errors.array().map(error => {
            return {message: error.msg}
          }));
        }

        const account = req.params.user;
        User.findOne({ email: account}, function(error, creds){
            if(error){
                const response = { message: error.message };
                console.log(response);
                return res.status(404).send(JSON.stringify(response));
            }else{
                const response = creds;
                return res.status(200).send(JSON.stringify(response));
            }
        })
    },
  saveAccount(req, res){
    console.log("Saving new credentials...");

        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).jsonp(errors.array().map(error => {
            return {message: error.msg}
          }));
        }

        var info = req.body;
        User.create({
          email: info.email,
          password: info.password,
          firstName: info.firstName,
          lastName: info.lastName,
          recordings: []
        }).then((postResponse) => {
          const response = postResponse;
          //console.log(response);
          return res.status(200).send(response);
        }).catch((error) => {
          const response = { message: error.message };
          console.error(response);
          console.log(response);
          return res.status(404).send(response);
        })
}
}