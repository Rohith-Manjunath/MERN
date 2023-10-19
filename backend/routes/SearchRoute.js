const express = require("express");
const router = express.Router();
const { Search } = require("../controllers/SearchController");

router.get("/search/:key", Search);

module.exports = router;
