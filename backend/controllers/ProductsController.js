const Product = require("../db/ProductsSchema");
const jwt = require("jsonwebtoken");

const GetAllProducts = async (req, res) => {
  try {
    jwt.verify(req.token, "secretKey", async (err, authdata) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized User" });
      } else {
        let findProducts = await Product.find();
        res.json(findProducts);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const AddNewProduct = async (req, res) => {
  try {
    const { ImageUrl, Model, Price, Description, Category } = req.body;
    let product = await Product.create({
      ImageUrl: ImageUrl,
      Model: Model,
      Price: Price,
      Description: Description,
      Category: Category,
    });

    let UpdatedProduct = product.toObject();
    res.status(200).json(UpdatedProduct);
  } catch (e) {
    res.json(400).json(e.message);
  }
};

const UpdateProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Update = async (req, res) => {
  try {
    let updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (updatedProduct) {
      res.status(200).json("Product updated successfully");
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    let product = await Product.deleteOne({ _id: req.params.id });
    if (product.deletedCount > 0) {
      res.status(200).json("Product deleted Successfully");
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Laptops = async (req, res) => {
  try {
    let laptops = await Product.find({ Category: "Laptop" });
    res.json(laptops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Mobiles = async (req, res) => {
  try {
    let mobiles = await Product.find({ Category: "Mobile" });
    res.json(mobiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  GetAllProducts,
  AddNewProduct,
  UpdateProduct,
  Update,
  DeleteProduct,
  Laptops,
  Mobiles,
};
