const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  ImageUrl: {
    type: String,
    required: true,
  },
  Model: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("cart", userSchema);
module.exports = ProductModel;
