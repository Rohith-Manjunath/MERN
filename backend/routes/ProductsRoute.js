const express = require("express");
const router = express.Router();
const Product = require("../db/ProductsSchema");
const {
  GetAllProducts,
  AddNewProduct,
  UpdateProduct,
  Update,
  DeleteProduct,
  Laptops,
  Mobiles,
} = require("../controllers/ProductsController");

router.get("/products", verifyToken, GetAllProducts);

router.post("/products", AddNewProduct);

router.get("/updateProduct/:id", UpdateProduct);

router.put("/updateProduct/:id", Update);

router.delete("/product/:id", DeleteProduct);

router.get("/products/laptops", Laptops);

router.get("/products/mobiles", Mobiles);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader != undefined) {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.json("Error");
  }
}

module.exports = router;
