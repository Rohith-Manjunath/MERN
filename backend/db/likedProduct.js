const mongoose = require("mongoose");
const likedSchema = new mongoose.Schema({
  ImageUrl: {
    type: String,
    required: true,
  },
  Model: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const LikedModel = mongoose.model("likedProduct", likedSchema);
module.exports = LikedModel;
