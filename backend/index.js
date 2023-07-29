const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require("./db/config");
const User = require("./db/Schems");
const Product = require("./db/ProductsSchema");
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

if (config) {
  app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`);
  });
}
