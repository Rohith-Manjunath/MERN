const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require("./db/config");
const User = require("./db/Schems");
const Product = require("./db/ProductsSchema");
const Liked = require("./db/likedProduct");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Home");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let find = await User.findOne({ email: email });

  if (find) {
    res.status(400).json({ Error: "User already exists" });
  } else {
    try {
      let user = await User.create({
        name: name,
        email: email,
        password: password,
      });
      let newUser = user.toObject();
      const token = jwt.sign(newUser, "secretKey", { expiresIn: "5h" });
      res.json({ message: "Register Successful", token: token });
    } catch (e) {
      return res.sendStatus(500), console.error(e);
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let find = await User.findOne({ email: email, password: password });

  if (find) {
    try {
      let newUser = find.toObject();
      const token = jwt.sign(newUser, "secretKey", { expiresIn: "5h" });
      res.status(200).json({ message: "Login successful", token });
    } catch (e) {
      return res.sendStatus(500).json(e);
    }
  } else {
    res.status(401).json({ Error: "No user exists" });
  }
});

app.get("/products", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretKey", async (err, authdata) => {
    if (err) {
      res.status(401).json("Unauthorized User");
    } else {
      let findProducts = await Product.find();
      res.json(findProducts);
    }
  });
});

app.post("/products", async (req, res) => {
  try {
    const { ImageUrl, Model, Price, Description } = req.body;
    let product = await Product.create({
      ImageUrl: ImageUrl,
      Model: Model,
      Price: Price,
      Description: Description,
    });

    let UpdatedProduct = product.toObject();
    res.status(200).json(UpdatedProduct);
  } catch (e) {
    res.json(400).json(e.message);
  }
});

app.get("/updateProduct/:id", async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });
  res.json(product);
});
app.put("/updateProduct/:id", async (req, res) => {
  let product = await Product.updateOne(
    { _id: req.params.id },

    {
      $set: req.body,
    }
  );

  if (product) {
    res.status(200).json("Product updated successfully");
  } else {
    res.status(400).json("Something went wrong");
  }
});

app.delete("/product/:id", async (req, res) => {
  let product = await Product.deleteOne({ _id: req.params.id });
  if (product) {
    res.status(200).json("Product deleted Successfully");
  } else {
    res.status(400).json("something went wrong");
  }
});

app.post("/liked/:id", async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });

  if (product) {
    let liked = await Liked.create({
      ImageUrl: product.ImageUrl,
      Model: product.Model,
      Price: product.Price,
      Description: product.Description,
    });

    res.status(200).json(liked);
  }
});

app.get("/liked", async (req, res) => {
  let product = await Liked.find();

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json({ Error: "something went wrong" });
  }
});

app.delete("/removeLiked/:id", async (req, res) => {
  let product = await Liked.deleteOne({ _id: req.params.id });
  if (product) {
    res.status(200).json("Item Removed Successfully");
  } else {
    res.status(400).json("something went wrong");
  }
});

app.get("/filter1", async (req, res) => {
  let filter = await Product.find({ Price: { $gte: 1000, $lte: 10000 } });
  res.json(filter);
});

app.get("/filter2", async (req, res) => {
  let filter = await Product.find({ Price: { $gte: 11000, $lte: 20000 } });
  res.json(filter);
});
app.get("/filter3", async (req, res) => {
  let filter = await Product.find({ Price: { $gte: 21000, $lte: 30000 } });
  res.json(filter);
});

app.get("/filter4", async (req, res) => {
  let filter = await Product.find({ Price: { $gte: 31000, $lte: 40000 } });
  res.json(filter);
});

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

app.get("/search/:key", async (req, res) => {
  const Price = Number(req.params.key);

  try {
    let user = await Product.find({
      $or: [
        { Model: { $regex: req.params.key } },
        { Price: Price },
        { Description: { $regex: req.params.key } },
      ],
    });

    res.json(user);
  } catch (e) {
    res.json(e.message);
  }
});

if (config) {
  app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`);
  });
}
