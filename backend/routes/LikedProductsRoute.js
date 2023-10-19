const express = require("express");
const router = express.Router();
const {
  AddToLikedProducts,
  GetAllLikedProducts,
  RemoveFromLikedProducts,
} = require("../controllers/LikedProductsController.js");

router.post("/liked/:id", AddToLikedProducts);

router.get("/liked", GetAllLikedProducts);

router.delete("/removeLiked/:id", RemoveFromLikedProducts);

module.exports = router;
