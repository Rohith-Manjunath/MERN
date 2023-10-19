const express = require("express");
const router = express.Router();
const {
  Filter1,
  Filter2,
  Filter3,
} = require("../controllers/FilterController");

router.get("/filter1", Filter1);

router.get("/filter2", Filter2);

router.get("/filter3", Filter3);

module.exports = router;
