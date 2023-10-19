const express = require("express");
const router = express.Router();
const {
  CartItems,
  AddNewCartItem,
  RemoveCartItem,
  TotalCartPrice,
} = require("../controllers/CartController");

router.get("/cart", CartItems);

router.post("/cart/:id", AddNewCartItem);

router.delete("/removeCart/:id", RemoveCartItem);

router.get("/cart/totalPrice", TotalCartPrice);

module.exports = router;
