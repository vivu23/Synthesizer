const express = require("express");
const db = require("../connect");
const router = express.Router();

//login
router.get("/:user", (req, res) => {
  console.log("hello")
  db.checkLogin(req,res);});

router.post("/", (req, res) => {
  console.log("User to insert " + req.body); db.saveAccount(req, res);});

module.exports = router;