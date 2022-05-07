const express = require("express");
const db = require("../databases/connect");
const router = express.Router();

router.post('/:userid', db.upload.single('file'), (req, res) => {
console.log("Uploading....");
db.uploadFile(req,res);
});

router.get('/:userid', (req,res) => {
  console.log("Getting the recordings.....");
  db.findRecordings(req,res);
})
module.exports = router;