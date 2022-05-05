const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const multer = require('multer');
require("dotenv").config({ path: "config.env" });
const username = process.env.UN;
const pw = process.env.PW;
const uri = "mongodb+srv://" + username + ":" + pw + "@cluster0.u5nnm.mongodb.net/synthesizerDB?retryWrites=true&w=majority";
const Grid = require('gridfs-stream');
let streamBuffers = require('stream-buffers');


mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true}, function( err, client ) {
    if (err) throw err;
    console.log("Connected to MongoDB.");
});

var Schema = mongoose.Schema;
var conn = mongoose.connection;

Grid.mongo = mongoose.mongo;
var gfs;
conn.once('open', function () {
  console.log('open');
  gfs = Grid(conn.db);
});

var upload = multer();

var mediaFileSchema = new mongoose.Schema({
  fileName: String,
  encoding: String,
  size: String,
  mimetype: String,
  userid: String
});

var MediaFile = mongoose.model('MediaFile', mediaFileSchema);

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});
  
var User = mongoose.model("users", userSchema);

module.exports = {
  upload,
  uploadFile(req, res){

    console.log(req.file);
    console.log(req.body);
    var body = req.body;
    req.file.fileName = body.fileName;
    var newMediaFile = new MediaFile(req.file);
    newMediaFile.userid = req.params.userid;

    newMediaFile.save((err, mediaFile)=>{
      if(err){
        return res.status(500).send('Error occured: database error')
      }
      
      var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10,  //in miliseconds
        chunkSize: 2048 //in bytes
      });

      myReadableStreamBuffer.put(req.file.buffer);
      myReadableStreamBuffer.stop();

      //streaming to gridfs
      //filename to store in mongodb 
      var writeStream = gfs.createWriteStream({
        fileName: 'w/'+ req.params.id
      });
      myReadableStreamBuffer.pipe(writeStream);
      writeStream.on('close',(file)=>{
        console.log(file.fileName + 'Written to DB');
      });

      res.json(mediaFile);
    })
  },
  findRecordings(req,res){
    MediaFile.findOne({id: req.params.id}, (err, mediaFile)=>{
      if(err || mediaFile == null){
        return res.status(500).send('Error occurred: database error');
      }
      res.set('Content-type', mediaFile.mimetype);
     
 //read from mongodb
 const readstream = gfs.createReadStream({'_id': mediaFile._id})
 readstream.on('error', function (error) {
      res.sendStatus(500)
 })
 readstream.pipe(res)
});
  },
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