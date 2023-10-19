const Product = require("../db/ProductsSchema");

const Filter1 = async (req, res) => {
  try {
    let filter = await Product.find({ Price: { $gte: 10000, $lte: 20000 } });
    res.json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Filter2 = async (req, res) => {
  try {
    let filter = await Product.find({ Price: { $gte: 21000, $lte: 40000 } });
    res.json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Filter3 = async (req, res) => {
  try {
    let filter = await Product.find({ Price: { $gte: 21000, $lte: 40000 } });
    res.json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { Filter1, Filter2, Filter3 };
