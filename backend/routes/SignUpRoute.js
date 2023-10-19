const express = require("express");
const config = require("../db/config");
const router = express.Router();
const { SignUp } = require("../controllers/SignUpController");

if (config) {
  router.post("/register", SignUp);
} else {
  res.status(200).json("Error registering try again");
}

module.exports = router;
