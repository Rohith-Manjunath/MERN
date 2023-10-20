const express = require("express");
const router = express.Router();
require("dotenv").config();
const { Paymentgateway } = require("../controllers/PaymentController");

router.post("/checkout", Paymentgateway);

module.exports = router;
