const Product = require("../db/ProductsSchema");
const Cart = require("../db/cart");

const CartItems = async (req, res) => {
  try {
    let product = await Cart.find();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "No products in the cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddNewCartItem = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    let isThere = await Cart.findOne({ Model: product.Model });

    if (isThere) {
      res.json({ message: "Product already exists in your cart" });
    } else {
      if (product) {
        let liked = await Cart.create({
          ImageUrl: product.ImageUrl,
          Model: product.Model,
          Price: product.Price,
          Description: product.Description,
        });

        res.status(200).json(liked);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveCartItem = async (req, res) => {
  try {
    let product = await Cart.deleteOne({ _id: req.params.id });
    if (product.deletedCount > 0) {
      res.status(200).json("Item Removed Successfully");
    } else {
      res.status(404).json({ error: "Item not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const TotalCartPrice = async (req, res) => {
  try {
    let cart = await Cart.find();

    let totalPrice = cart.reduce((sum, item) => sum + +item.Price, 0);

    res.json({ totalPrice });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

module.exports = { CartItems, AddNewCartItem, RemoveCartItem, TotalCartPrice };
