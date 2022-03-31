const { MongoClient } = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");
require("dotenv").config({ path: "server/config.env" });
const username = process.env.UN;
const pw = process.env.PW;
const uri = "mongodb+srv://" + username + ":" + pw + "@cluster0.u5nnm.mongodb.net/synthesizerDB?retryWrites=true&w=majority";

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  });
  
var User = mongoose.model("User", userSchema);

mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true}, function( err, client ) {
    if (err) throw err;
    console.log("Connected to MongoDB.");
});

module.exports = {
	checkLogin(req, res){
        console.log("Checking login credentials...");

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).jsonp(errors.array().map(error => {
                return { message: error.msg }
            }));
        }

        const account = req.params.user;

        User.findOne({ email: account }, function(error, creds){
            if(error){
                const response = { message: error.message };
                console.error(response);
                return res.status(404).send(JSON.stringify(response));
            }else{
                const response = creds;
                //console.log("Response from GET /login/:user: ");
                //console.log(JSON.stringify(response));
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
        var email = info.email;
        var password = info.password;
        var firstName = info.firstName;
        var lastName = info.lastName;

        var newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.save(function(err, savedUser){
            if(err){
                const response = { message: error.message };
                console.error(response);
                return res.status(500).send(JSON.stringify(response));
            }
            return res.status(200).send();
        });
    }
}