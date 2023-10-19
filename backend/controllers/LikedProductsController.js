const Liked = require("../db/likedProduct");
const Product = require("../db/ProductsSchema");

const AddToLikedProducts = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    let isThere = await Liked.findOne({ Model: product.Model });

    if (isThere) {
      res.json({ message: "Product already exists in likedList" });
    } else {
      if (product) {
        let liked = await Liked.create({
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

const GetAllLikedProducts = async (req, res) => {
  try {
    let product = await Liked.find();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ Error: "No liked products found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveFromLikedProducts = async (req, res) => {
  try {
    let product = await Liked.deleteOne({ _id: req.params.id });
    if (product.deletedCount > 0) {
      res.status(200).json("Item Removed Successfully");
    } else {
      res.status(404).json({ error: "Item not found in the liked list" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AddToLikedProducts,
  GetAllLikedProducts,
  RemoveFromLikedProducts,
};
