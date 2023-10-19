const Product = require("../db/ProductsSchema");

const Search = async (req, res) => {
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
};

module.exports = { Search };
