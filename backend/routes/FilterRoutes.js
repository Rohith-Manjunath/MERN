const express = require("express");
const router = express.Router();
const {
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
} = require("../controllers/FilterController");

router.get("/filter1", Filter1);

router.get("/filter2", Filter2);

router.get("/filter3", Filter3);
router.get("/filter4", Filter4);
router.get("/filter5", Filter5);

module.exports = router;
