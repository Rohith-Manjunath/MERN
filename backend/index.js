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
const Cart = require("./db/cart");
app.use(cors());
const saltRounds = 10;
app.use(express.json());
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  res.status(200).json("Home");
});

if (config) {
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
      let find = await User.findOne({ email: email });

      if (find) {
        return res.status(400).json({ Error: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      let user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      let newUser = user.toObject();
      const token = generateToken(newUser);

      res.json({ message: "Register Successful", token: token });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  });
} else {
  res.status(200).json("Error registering try again");
}

// Function to hash a password
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

// Function to generate a JWT token
function generateToken(user) {
  const token = jwt.sign(user, "secretKey", { expiresIn: "5h" });
  return token;
}

if (config) {
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ Error: "No user exists" });
      }

      const isMatch = await comparePasswords(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ Error: "Invalid password" });
      }

      const token = generateToken(user.toObject());

      res.status(200).json({ message: "Login successful", token });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  });
} else {
  res.status(200).json("Error Loggin in try again");
}

// Function to compare a password against a hash
async function comparePasswords(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

// Function to generate a JWT token
function generateToken(user) {
  const token = jwt.sign(user, "secretKey", { expiresIn: "5h" });
  return token;
}

app.get("/products", verifyToken, async (req, res) => {
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
});

app.post("/products", async (req, res) => {
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
});

app.get("/updateProduct/:id", async (req, res) => {
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
});

app.put("/updateProduct/:id", async (req, res) => {
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
});

// ... (your imports and setup)

app.delete("/product/:id", async (req, res) => {
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
});

app.post("/liked/:id", async (req, res) => {
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
});

app.get("/liked", async (req, res) => {
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
});

// ... (your imports and setup)

app.get("/cart", async (req, res) => {
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
});

app.post("/cart/:id", async (req, res) => {
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
});

app.delete("/removeCart/:id", async (req, res) => {
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
});

app.delete("/removeLiked/:id", async (req, res) => {
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
});

// ... (your imports and setup)

app.get("/filter1", async (req, res) => {
  try {
    let filter = await Product.find({ Price: { $gte: 10000, $lte: 20000 } });
    res.json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/filter2", async (req, res) => {
  try {
    let filter = await Product.find({ Price: { $gte: 21000, $lte: 40000 } });
    res.json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/filter3", async (req, res) => {
  try {
    let filter = await Product.find({ Price: { $gte: 40000 } });
    res.json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/search/:key", async (req, res) => {
  const searchKey = req.params.key;

  try {
    // Assuming Price is stored as a numeric type in the database
    // Convert the search key for Price to a number
    const numericPrice = parseFloat(searchKey);

    let products = await Product.find({
      $or: [
        { Model: { $regex: searchKey, $options: "i" } }, // Case-insensitive search for Model
        { Description: { $regex: searchKey, $options: "i" } }, // Case-insensitive search for Description
      ],
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ... (your imports and setup)

app.get("/products/laptops", async (req, res) => {
  try {
    let laptops = await Product.find({ Category: "Laptop" });
    res.json(laptops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products/mobiles", async (req, res) => {
  try {
    let mobiles = await Product.find({ Category: "Mobile" });
    res.json(mobiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", reason.stack || reason);
  process.exit(1);
});

app.get("/cart/totalPrice", async (req, res) => {
  try {
    let cart = await Cart.find();

    let totalPrice = cart.reduce((sum, item) => sum + +item.Price, 0);

    res.json({ totalPrice });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

app.put("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const { password } = req.body;

      user.password = await bcrypt.hash(password, 10);

      await user.save();

      return res.json({ message: "Password updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

if (config) {
  app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`);
  });
}
