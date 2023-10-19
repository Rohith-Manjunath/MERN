const express = require("express");
const config = require("../db/config");
const router = express.Router();
const { Login } = require("../controllers/LoginController");

if (config) {
  router.post("/login", Login);
} else {
  res.status(200).json("Error Loggin in try again");
}

module.exports = router;
